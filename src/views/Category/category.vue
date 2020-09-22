<template>
		<div class="mi-category">
			<div class="page-header">
				<img src="@/assets/img/icon_search.png" />
				<input type="text" placeholder='米10哆啦A梦限定款' />
			</div>
			<div class="page-content">
				<div class="hide-scroll left">
					<ul class="category-main">
						<li
							v-for='item in listMain'
							:key='item.id'
							:class='{active: item.id === activeId}'
							@click='toggleId(item.id)'
						>
							<span v-text='item.name'></span>
						</li>
					</ul>
				</div>
				<div class="hide-scroll right">
					<img :src="avatar" alt="" class="avatar" />
					<p v-if='listSub.length === 0' class="empty">暂无相关分类，请敬请期待~~~</p>
					<ul v-else class="category-sub">
						<li
							v-for='item in listSub'
							:key='item.id'>
							<router-link :to='`/list/${item.id}`'>
								<img :src='item.avatar' />
								<span v-text='item.name'></span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="page-footer">
				<miNav :total="total"></miNav>
			</div>
		</div>
</template>

<script type="text/ecmascript-6">
	import miNav from '../../components/MiNav';

        export default {
                name: 'category',
	        components: {
                        miNav,
	        },
                data: function() {
                        return {
                                listMain: [], // 一级分类数据
                                listSub: [],  // 二级分类数据
                                activeId: 0,  // 当前激活的一级分类的id值
	                        total: 0
                        };
                },
                computed: {
                        avatar: function() {
                                return this.activeId ? this.listMain.find(item => this.activeId === item.id).avatar : '';
                        }
                },
                methods: {
                        toggleId: function(id) {
                                this.activeId = id;
                                this.$axios({
                                        method: 'get',
                                        url: '/category/list/' + id
                                })
                                        .then(data => { // 如果不写箭头函数，this穿透不出去，就获取不到listMain
                                                this.listSub = data;
                                        })
                        }
                },
                created () {
                        // 这个vue生命周期钩子函数，主要作用是请求数据
                        this.$axios({
                                url: '/category/list/0',
                                method: 'get'
                        })
                                .then(data => { // 如果不写箭头函数，this穿透不出去，就获取不到listMain
                                        this.listMain = data;
                                        this.toggleId(data[0].id);
                                })
                        if(!this.$cookies.get('token')) {
                                this.total = 0;
                                return;
                        }else {
                                this.$axios({
                                        methd: 'get',
                                        url: '/cart/total'
                                })
                                        .then(total => this.total = total);
                        }
                }
        };
</script>

<style lang="stylus" type="text/stylus" scoped>
	.mi-category {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.mi-category .page-header {
		height: 45px;
		flex-shrink: 0;
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.mi-category .page-header>img {
		position: absolute;
		top: 15px;
		left: 20px;
		width: 17px;
		height: 17px;
	}
	.mi-category .page-header>input {
		font-size: 12px;
		width: 100%;
		height: 35px;
		border-radius: 17.5px;
		text-indent: 3em;
		color: #999;
		background-color: rgb(245, 245, 245);
	}
	.mi-category .page-footer {
		height: 50px;
		flex-shrink: 0;
	}
	.mi-category .page-content {
		flex-grow: 1;
		border-top: 1px solid #b0b0b0;
		border-bottom: 1px solid #b0b0b0;
		display: flex;
		overflow: hidden;
	}
	.mi-category .page-content>.left {
		width: 95px;
		flex-shrink: 0;
		overflow: auto;  /* 必须配合父元素的overflow */
	}

	/* ul.category-main */
	.mi-category .page-content>.left>ul.category-main {}
	.mi-category .page-content>.left>ul.category-main>li {
		flex-grow: 1;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mi-category .page-content>.left>ul.category-main>li>span {
		margin: 0 10px;
		flex-grow: 1;
		height: 24px;
		line-height: 24px;
		text-align: center;
		font-size: 13px;
		border-radius: 12px;
		color: #666;
	}
	.mi-category .page-content>.left>ul.category-main>li.active>span {
		color: #fff;
		background: linear-gradient(to right, rgb(241, 83, 56), rgb(223, 20, 15));
	}


	.mi-category .page-content>.right {
		padding: 10px;
		box-sizing: border-box;
		width: 100%;
		flex-grow: 1;
		overflow: auto;
		border-left: 1px solid #b0b0b0;
		background-color: #eee;
	}
	/* ul.category-sub */
	.mi-category .page-content>.right>img.avatar {
		width: 100%;
		border-radius: 10px;
	}
	.mi-category .page-content>.right>ul.category-sub {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		border-radius: 10px;
		margin-top: 10px;
		background-color: #fff;
	}
	.mi-category .page-content>.right>ul.category-sub>li {
		box-sizing: border-box;
		padding: 10px 0;
	}
	.mi-category .page-content>.right>ul.category-sub>li>a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.mi-category .page-content>.right>ul.category-sub>li>a>img {
		width: 80px;
	}
	.mi-category .page-content>.right>ul.category-sub>li>a>span {
		font-size: 11px;
		color: #666;
	}
	.mi-category .page-content>.right>p.empty {
		display: block;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 10px;
		margin-top: 10px;
		font-size: 14px;
		color: #999;
		background-color: #fff;
	}
</style>