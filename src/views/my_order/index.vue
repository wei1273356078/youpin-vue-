<template>
	<!-- order-page-container -->
	<div class="order-page-container">
		<!-- order-header -->
		<div class="order-header">
			<!-- my-order -->
			<div class="my-order">
				<i class="iconfont icon-back prev-back" @click="$router.back()"></i>
				<span>我的订单</span>
				<i class="search"></i>
			</div>
			<!-- select-item -->
			<div class="select-item">
				<span class="all-order" :class="{ show: order === 0 }" @click="order = 0">全部</span>
				<span class="dai-fu-kuan" :class="{ show: order === 1 }" @click="order = 1">待付款</span>
				<span class="dai-shou-huo" :class="{ show: order === 2 }" @click="order = 2">待收货</span>
				<span class="tui-kuan" :class="{ show: order === 3 }" @click="order = 3">退款订单</span>
				<span class="yi-shou-huo" :class="{ show: order === 4 }" @click="order = 4">已收货</span>
			</div>
		</div>
		<!-- order-content -->
		<div class="order-content-wrap hide-scroll">
			<div class="order-content1 show" v-show="order === 0">
				<div class="empty" v-show="allOrder.length === 0">
					<img src="/images/order_confirm/no_result_order.png" />
					<span>目前没有订单哦~</span>
				</div>
				<div class='all-order' v-show="allOrder.length > 0" v-for="(item, i) in allOrder" :key="item.orderId">
					<div class='order-product' v-for="product in item.details" :key="product.id">
						<div class='img-wrap'><img :src='product.avatar' /></div>
						<div class='product-name' v-text="product.name"></div>
						<div class='product-param'>
							<span class='price' v-text="`￥${product.price.toFixed(2)}`"></span>
							<span class='count' v-text="`x ${product.count}`"></span>
						</div>
					</div>
					<div class='order-account'>
						共<span class='total' v-text="total(item.details)"></span>件商品，总金额￥<span class='account' v-text="item.account"></span>.00
					</div>
					<div class='order-edit'>
						<span class='delete' @click="remove(item)">删除订单</span>
						<span class="again-buy" @click="rebuy(item.orderId)" v-show="item.pay === 0">再次购买</span>
						<span class="green" v-show="item.pay === 1">已付款</span>
					</div>
				</div>
			</div>
			<div class="order-content2" v-show="order === 1">
				<div class="empty" v-show="daiFuKuan.length === 0">
					<img src="/images/order_confirm/no_result_order.png" />
					<span>目前没有待付款的订单哦~</span>
				</div>
				<div class='all-order' v-show="daiFuKuan.length > 0" v-for="item in daiFuKuan" :key="item.orderId">
					<div class='order-product1' v-for="product in item.details">
						<div class='img-wrap'><img :src='product.avatar' /></div>
						<div class='product-name' v-text="product.name"></div>
						<div class='product-param'>
							<span class='price' v-text="`￥${product.price.toFixed(2)}`"></span>
							<span class='count' v-text="`x ${product.count}`"></span>
						</div>
					</div>
					<div class='order-account1'>
						共<span class='total' v-text="total(item.details)"></span>件商品，总金额￥<span class='account' v-text="item.account"></span>.00
					</div>
					<div class='order-edit1'>
						<span class='delete' @click="remove(item)">删除订单</span>
						<span class="again-buy" @click="rebuy(item.orderId)">再次购买</span>
					</div>
				</div>
			</div>
			<div class="order-content3" v-show="order === 2">
				<div class="empty" v-show="daiShouHuo.length === 0">
					<img src="/images/order_confirm/no_result_order.png" />
					<span>目前没有待收货的订单哦~</span>
				</div>
				<div class='all-order' v-show="daiShouHuo.length > 0" v-for="item in daiShouHuo" :key="item.orderId">
					<div class='order-product2' v-for="product in item.details">
						<div class='img-wrap'><img :src='product.avatar' /></div>
						<div class='product-name' v-text="product.name"></div>
						<div class='product-param'>
							<span class='price' v-text="`￥${product.price.toFixed(2)}`"></span>
							<span class='count' v-text="`x ${product.count}`"></span>
						</div>
					</div>
					<div class='order-account2'>
						共<span class='total' v-text="total(item.details)"></span>件商品，总金额￥<span class='account' v-text="item.account"></span>.00
					</div>
					<div class='order-edit2'>
						<span class='delete' @click="remove(item)">删除订单</span>
						<span class="green">已付款</span>
					</div>
				</div>
			</div>
			<div class="order-content4" v-show="order === 3">
				<img src="/images/order_confirm/no_result_order.png" />
				<span>目前没有退款订单哦~</span>
			</div>
			<div class="order-content5" v-show="order === 4">
				<img src="/images/order_confirm/no_result_order.png" />
				<span>目前没有已收货订单哦~</span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'myOrder',
	        data() {
                        return {
                                daiShouHuo: [],
	                        daiFuKuan: [],
	                        allOrder: [],
	                        order: 0,  // 0全部订单、1付款订单、2收货订单
                        }
	        },
	        computed: {
                        total() {
                                return total => {
                                        let nums = 0;
                                        total.forEach(item => nums = nums + item.count);
                                        return nums;
                                }
                        },
	        },
	        methods: {
                        remove(item) {
                                this.$axios({
	                                url: '/order/remove/' + item.orderId,
	                                mothod: 'get'
                                })
	                                .then(data => {
	                                        let i = this.allOrder.findIndex(item1 => item.orderId === item1.orderId);
	                                        this.allOrder.splice(i, 1);
                                                let i1 = this.daiShouHuo.findIndex(item1 => item.orderId === item1.orderId);
                                                this.daiShouHuo.splice(i1, 1);
                                                let i2 = this.daiFuKuan.findIndex(item1 => item.orderId === item1.orderId);
                                                this.daiFuKuan.splice(i2, 1);
	                                });
                        },
                        rebuy(orderId) {
                                this.$router.push({
	                                path: '/pay',
	                                query: {
                                                orderNO: orderId
	                                }
                                })
                        },
	        },
	        created() {
                        // 请求全部订单
		        this.$axios({
			        url: '/order/list_all',
			        method: 'get'
		        })
			        .then(data => {
			                this.allOrder = data;
			        });
		        // 请求待付款订单
		        this.$axios({
			        url: '/order/list_unpay',
			        method: 'get'
		        })
			        .then(data => {
		                        this.daiFuKuan = data;
		                });
		        // 请求待收货订单
		        this.$axios({
			        url: '/order/list_pay',
			        method: 'get'
		        })
			        .then(data => {
			                this.daiShouHuo = data;
			        });
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	/* order-page-container */
	.order-page-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	/* order-header */
	.order-header {
		height: 90px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		background-color: rgb(244, 244, 244);
	}
	/* my-order */
	.order-header>.my-order {
		height: 45px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-header>.my-order>span {
		flex-grow: 1;
		font-size: 18px;
		text-align: center;
	}
	.order-header>.my-order>i {
		flex-shrink: 0;
		width: 40px;
		height: 100%;
		text-align: center;
		line-height: 45px;
	}
	.order-header>.my-order>i.prev-back {
		font-size: 24px;
	}
	.order-header>.my-order>i.search {
		background-image: url('/images/category/icon_search.png');
		background-size: 20px;
		background-position: center;
		background-repeat: no-repeat;
	}
	/* select-item */
	.select-item {
		display: flex;
		height: 45px;
		padding: 0 5px;
		justify-content: space-around;
		align-items: center;
	}
	.select-item>span {
		font-size: 15px;
		padding: 2px 8px;
	}
	.select-item>span.show {
		border-radius: 13px;
		color: #fff;
		background: linear-gradient(to right, rgb(240, 206, 123), rgb(221, 177, 81));
	}



	/* order-content-wrap */
	.order-content-wrap {
		flex-grow: 1;
		padding: 0 10px;
		overflow: auto;
		background-color: rgb(244, 244, 244);
	}
	/* order-content1 */
	.order-content1,
	.order-content2,
	.order-content3 {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.order-content1>.empty,
	.order-content2>.empty,
	.order-content3>.empty {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.order-content1>.empty>img,
	.order-content2>.empty>img,
	.order-content3>.empty>img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.order-content1>.empty>span,
	.order-content2>.empty>span,
	.order-content3>.empty>span {
		font-size: 14px;
		margin-top: 10px;
		color: #666;
	}
	.order-content1>.all-order,
	.order-content2>.all-order,
	.order-content3>.all-order {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		margin-top: 10px;
		padding: 10px;
		border-radius: 10px;
		background-color: #fff;
	}
	.order-content1>.all-order>.order-product,
	.order-content2>.all-order>.order-product1,
	.order-content3>.all-order>.order-product2 {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.order-content1>.all-order>.order-product>.img-wrap,
	.order-content2>.all-order>.order-product1>.img-wrap,
	.order-content3>.all-order>.order-product2>.img-wrap {
		width: 100px;
		height: 100px;
		margin-bottom: 10px;
		border-radius: 5px;
		background-color: rgb(244, 244, 244);
	}
	.order-content1>.all-order>.order-product>.img-wrap>img,
	.order-content2>.all-order>.order-product1>.img-wrap>img,
	.order-content3>.all-order>.order-product2>.img-wrap>img {
		width: 100%;
		height: 100%;
	}
	.order-content1>.all-order>.order-product>.product-name,
	.order-content2>.all-order>.order-product>.product-name,
	.order-content3>.all-order>.order-product>.product-name {
		padding-top: 10px;
		width: 170px;
		flex-shrink: 0;
		font-size: 17px;
		color: #333;
	}
	.order-content1>.all-order>.order-product>.product-param,
	.order-content2>.all-order>.order-product1>.product-param,
	.order-content3>.all-order>.order-product2>.product-param {
		padding-top: 10px;
		font-size: 15px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: #999;
	}
	.order-content1>.all-order>.order-product>.product-param>span.price,
	.order-content2>.all-order>.order-product1>.product-param>span.price,
	.order-content3>.all-order>.order-product2>.product-param>span.price {
		padding-bottom: 5px;
	}
	.order-content1>.all-order>.order-product>.product-param>span.count {}
	.order-content1>.all-order>.order-account,
	.order-content2>.all-order>.order-account1,
	.order-content3>.all-order>.order-account2 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 44px;
		font-size: 14px;
		color: #333;
	}
	.order-content1>.all-order>.order-account>.span.total {}
	.order-content1>.all-order>.order-account>.span.account,
	.order-content2>.all-order>.order-account1>.span.account,
	.order-content3>.all-order>.order-account2>.span.account {
		font-size: 18px;
	}
	.order-content1>.all-order>.order-edit,
	.order-content2>.all-order>.order-edit1,
	.order-content3>.all-order>.order-edit2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 52px;
	}
	.order-content1>.all-order>.order-edit>span.delete,
	.order-content2>.all-order>.order-edit1>span.delete,
	.order-content3>.all-order>.order-edit2>span.delete {
		font-size: 16px;
		color: #999;
	}
	.order-content1>.all-order>.order-edit>span.again-buy,
	.order-content2>.all-order>.order-edit1>span.again-buy,
	.order-content3>.all-order>.order-edit2>span.again-buy {
		padding: 5px 10px;
		font-size: 16px;
		border: 1px solid rgb(191, 17, 17);
		border-radius: 18px;
		color: rgb(191, 17, 17);
	}
	.order-content1>.all-order>.order-edit>span.green,
	.order-content2>.all-order>.order-edit1>span.green,
	.order-content3>.all-order>.order-edit2>span.green {
		color: #0AA243;
	}




	/* order-content4-5 */
	.order-content4,
	.order-content5 {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.order-content4>img,
	.order-content5>img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.order-content4>span,
	.order-content5>span {
		font-size: 14px;
		margin-top: 10px;
		color: #666;
	}


</style>