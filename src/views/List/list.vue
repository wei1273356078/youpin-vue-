<template>
	<div class="page-container">
		<i class="iconfont icon-top rocket" v-show="rocketShow" @click="gotoTop"></i>
		<div class="page-header">
			<div class="page-header-top">
				<router-link to="/category" class="back iconfont icon-back"></router-link>
				<input type="text" class="search" />
				<i class="show-mode iconfont icon-card" @click="showWithCart = !showWithCart"></i>
			</div>
			<div class="page-header-order">
				<i class="order-dir iconfont" :class="`icon-sort-${orderDir}`" @click="toggleOrderDir"></i>
				<span class="order-col" :class="{ active: orderCol === 'price' }" @click="toggleOrderCol('price')">价格</span>
				<span class="order-col" :class=" { active: orderCol === 'sale' }" @click="toggleOrderCol('sale')">销量</span>
				<span class="order-col" :class=" { active: orderCol === 'rate' }" @click="toggleOrderCol('rate')">评价</span>
			</div>
		</div>
		<div class="hide-scroll scroll page-content" ref="scroll">
			<div class="scroll-content">
				<ul class="product-list" :class="showWithCart ? 'card' : 'list'">
					<li v-for="item in list" :key="item.id">
						<router-link :to='`/detail/${item.id}`'>
							<div class='img-wrapper'>
								<img :src='item.avatar' />
							</div>
							<div class='detail-wrapper'>
								<div>
									<h4 class='ellipsis' v-text="item.name"></h4>
									<p class='ellipsis brief' v-text="item.brief"></p>
									<p class='price'>￥<span class='price' v-text="item.price"></span></p>
									<span class='sale' v-text="`销量：${item.sale}`"></span>
									<span class='rate' v-text="`评论：${item.rate}`"></span>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
				<p class="info" v-text="info"></p>
			</div>
		</div>
	</div>
</template>

<script>
	import IScroll from 'iscroll/build/iscroll-probe';
	import imagesLoaded from 'imagesloaded';

	export default {
	        name: 'list',
		data() {
	                return {
		                cid: 0,
		                name: '',   // 表示当前用户输入的搜索关键字
		                orderDir: 'asc',    // 表示当前排序方向是升序
		                orderCol: 'price',   // 表示当前排序列是price
                                isLoading: false,    // 标识当前是否处于ajax交互
                                hasMore: true,       // 标识按当前条件查找商品还有没有更多
                                pageSize: 6,         // 每次向服务器拿取多少条数据
		                list: [],               // 保存列表数据
		                rocketShow: false,   // 标识返回顶部火箭是否显示
		                showWithCart: false,  // 是否以卡片形式展示商品数据
                                isTriggerLoadMore: false,   // 标识是否触发了上拉加载更多
	                };
		},
		computed: {
	                info: function(){
		                if(this.isLoading) return '加载中...';
		                else if(this.list.length === 0) return '暂无相关商品，敬请期待...';
		                else if(this.isTriggerLoadMore) return '放手立即加载...';
		                else if(this.hasMore) return '上拉加载更多...';
		                else return '已到达底部...';
                        }
		},
		activated() {
	                // 如果是第一次进入商品列表，或者是再次进入，但要看不同分类的商品则发送ajax
			if(this.cid === 0 || this.cid !== parseInt(this.$route.params.cid)) {
			        this.cid = parseInt(this.$route.params.cid);
			        this._updateProductList();
			}
		},
		beforeDestroy() {
	                if(this.scroll) {
	                        this.scroll.destroy();
	                        this.scroll = null;
	                }
		},
		methods: {
	                // 初始化或更新滚动
	                _initOrRefreshScroll: function(){
                                imagesLoaded(this.$refs.scroll, () => {   // 保证滚动区域图加载完毕
	                                this.$nextTick(() => {                     // 保证滚动区域图片渲染完毕
                                                if(!this.scroll) {
                                                        this.scroll = new IScroll(this.$refs.scroll, {
                                                                deceleration: 0.003,
                                                                bounce: false,
                                                                click: true,
                                                                probeType: 2,
                                                        });
                                                        this.scroll.on('scroll', () => {
                                                                this.rocketShow = Math.abs(this.scroll.y) >= 100;
                                                                if(this.hasMore && !this.isLoading) { // 如果可以加载更多且当前没有处于loading状态
                                                                        this.isTriggerLoadMore = this.scroll.y - this.scroll.maxScrollY === 0;
                                                                }
                                                                this.scroll.on('scrollEnd', () => {
                                                                        if(this.isTriggerLoadMore) {
                                                                                this.isTriggerLoadMore = false;
                                                                                this._updateProductList(true);
                                                                        }
                                                                });
                                                        });
                                                }else this.scroll.refresh();
	                                });
                                        //  setTimeout(() => {}, 17);   // 与nextTick一样 17毫秒
                                })
                        },
			// 更新商品列表
                        _updateProductList: function(isLoadMore = false){
                                this.isLoading = true;                        // 进入loading状态
                                if(!isLoadMore) {
                                        this.rocketShow = false;                  // 如果不是加载更多，请求一批新的数据，返回顶部的火箭重置为不显示，因为用户重头开始看的
                                        this.list = [];          // 如果不是加载更多，清空ul.product-list
                                        if(this.scroll) this.scroll.scrollTo(0, 0, 0);   // 如果不是加载更多请求一批新的数据，要让scroll重置回顶部，重头开始看
                                }
                                // 请求数据
                                setTimeout(() => {
                                        this.$axios({
                                                method: 'post',
                                                url: '/product/list',
                                                data: {
                                                        name: this.name,
                                                        cid: this.cid,
                                                        orderDir: this.orderDir,
                                                        orderCol: this.orderCol,
                                                        pageSize: this.pageSize,
                                                        begin: this.list.length
                                                }
                                        })
	                                        .then(data => {
                                                        this.isLoading = false;   // 结束loading状态
                                                        this.hasMore = data.length === this.pageSize;   // 更新全局变量hasMore
                                                        this.list = this.list.concat(data);   // 连接两个数组得到一个新的数组
                                                        this.$nextTick(() => this._initOrRefreshScroll());  // 初始化或更新scroll
                                                })
                                }, 400);
                        },
			// 切换商品列表排序的方向
			toggleOrderDir: function(isLoadMore = false){
                                if(this.isLoading){
                                        alert('你的操作太频繁了');
                                        return;
                                }
                                this.orderDir = this.orderDir === 'asc' ? 'desc' : 'asc';
                                this._updateProductList();
                        },
			// 切换商品列表排序的列
			toggleOrderCol: function(col){
				if(this.isLoading) { alert('你的操作太频繁了...'); return; };
				if(this.orderCol === col) return;
				this.orderCol = col;
				this._updateProductList();
                        },
			// 返回顶部
			gotoTop: function(){
				if(this.scroll) this.scroll.scrollTo(0, 0, 400);
				this.rocketShow = false;
                        }
		},
		// 监听指定数据的变化，可以监听data中、computed中、props中、$route路由中的数据
		watch: {
	                showWithCart: function (newValue, oldValue){
                                console.log(newValue, oldValue);
                                this.$nextTick(() => this._initOrRefreshScroll());
                        }

                }
	};
</script>

<style scoped>
	.page-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #Eee;
	}
	/* 顶部 */
	.page-header {
		flex-shrink: 0;
	}
	/* top */
	.page-header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 45px;
		box-sizing: border-box;
		padding: 10px 20px;
	}
	.page-header-top>a.back {
		font-size: 24px;
	}
	.page-header-top>input.search {
		text-indent: 1em;
		height: 32px;
		width: 260px;
		border-radius: 16px;
		background-color: #fff;
	}
	.page-header-top>i.show-mode {
		font-size: 20px;
	}
	/* order */
	.page-header-order {
		height: 36px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.page-header-order>i.order-dir {
		font-size: 20px;
		text-align: center;
		width: 50px;
		flex-grow: 0;
		color: rgb(191, 17, 17);
	}
	.page-header-order>span {
		text-align: center;
		flex-grow: 1;
		font-size: 14px;
		color: #333;
	}
	.page-header-order span.active {
		color: rgb(191, 17, 17);
	}
	/* 内容 */
	.page-content {
		overflow: hidden;
		flex-grow: 1;
		touch-action: pan-y;
	}
	.page-content>.scroll-content>p.info {
		font-size: 14px;
		text-align: center;
		margin-top: 10px;
		box-sizing: border-box;
		border-radius: 5px;
		height: 30px;
		line-height: 30px;
		background-color: #fff;
	}


	/* list渲染 */
	ul.product-list.list {
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	ul.product-list.list>li {
	}
	ul.product-list.list>li>a {
		display: flex;
		padding: 20px;
		padding-right: 0px;
		box-sizing: border-box;
	}
	ul.product-list.list>li>a>.img-wrapper {
		flex-shrink: 0;
		width: 126px;
		border-radius: 10px;
		background-color: #eee;
	}
	ul.product-list.list>li>a>.img-wrapper>img {
		width: 100%;
	}
	ul.product-list.list>li>a>.detail-wrapper {
		flex-grow: 1;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 20px;
		overflow: hidden;
	}
	ul.product-list.list>li>a>.detail-wrapper>div {
		width: 100%;
		flex-grow: 1;
		box-sizing: border-box;
	}
	ul.product-list.list>li>a>.detail-wrapper>div>h4 {
		font-size: 15px;
		font-weight: 400;
		color: #333;
	}
	ul.product-list.list>li>a>.detail-wrapper>div>p.brief {
		font-size: 13px;
		color: #999;
	}
	ul.product-list.list>li>a>.detail-wrapper>div>p.price {
		font-size: 12px;
		color: rgb(191, 17, 17);
	}
	ul.product-list.list>li>a>.detail-wrapper>div>p.price>span.price {
		font-size: 17px;
	}
	ul.product-list.list>li>a>.detail-wrapper>div>span.sale {
		font-size: 12px;
		color: #999;
	}
	ul.product-list.list>li>a>.detail-wrapper>div>span.rate {
		font-size: 12px;
		color: #999;
	}

	/* card渲染 */
	ul.product-list.card {
		display: flex;
		flex-wrap: wrap;
		padding: 5px;
		box-sizing: border-box;
	}
	ul.product-list.card>li {
		width: 50%;
		padding: 5px;
		box-sizing: border-box;
	}
	ul.product-list.card>li>a {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 10px;
		background-color: #fff;
	}
	ul.product-list.card>li>a>.img-wrapper {
		width: 100%;
	}
	ul.product-list.card>li>a>.img-wrapper>img {
		width: 100%;
	}
	ul.product-list.card>li>a>.detail-wrapper {}
	ul.product-list.card>li>a>.detail-wrapper>div {}
	ul.product-list.card>li>a>.detail-wrapper>div>h4 {
		font-size: 15px;
		font-weight: 400;
		color: #333;
	}
	ul.product-list.card>li>a>.detail-wrapper>div>p.brief {
		font-size: 13px;
		color: #999;
	}
	ul.product-list.card>li>a>.detail-wrapper>div>p.price {
		font-size: 12px;
		color: rgb(191, 17, 17);
	}
	ul.product-list.card>li>a>.detail-wrapper>div>p.price>span.price {
		font-size: 17px;
	}
	ul.product-list.card>li>a>.detail-wrapper>div>span.sale {
		font-size: 12px;
		color: #999;
	}
	ul.product-list.card>li>a>.detail-wrapper>div>span.rate {
		font-size: 12px;
		color: #999;
	}

	/* rocket 返回顶部 */
	i.rocket {
		position: fixed;
		bottom: 50px;
		right: 10px;
		z-index: 20;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		text-align: center;
		line-height: 50px;
		font-size: 24px;
		background-color: #ccc;
		color: #fff;
	}
</style>