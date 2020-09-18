<template>
	<div class="mi-order">
		<!-- order-top -->
		<div class="order-top" :class="{}">
			<i class="iconfont icon-back prev-back" @click="$router.back()"></i>
			<span>确认订单</span>
			<i></i>
		</div>
		<!-- order-container -->
		<div class="order-container">
			<div class="scroll hide-scroll">
				<!-- page-content -->
				<div class="page-content">
					<!-- order-font -->
					<div class="order-font">
						<i class="iconfont icon-arrow-left prev-back" @click="$router.back()"></i>
						<span>确认订单</span>
						<i></i>
					</div>
					<!-- order-address -->
					<div class="order-address" @click="gotoAddress">
						<div>
							<div>
								<span v-text="address.receiveName"></span>
								<span v-text="address.receivePhone"></span>
							</div>
							<p v-text="`${address.receiveRegion} ${address.receiveDetail}`"></p>
						</div>
						<i class='iconfont icon-arrow-right'></i>
					</div>
					<!-- order-product -->
					<div class="order-product">
						<div class='product'>
							<div v-for="item in orderInfo" :key="item.id" class='product-wrapper'>
								<div class='img-wrap'>
									<img :src='item.avatar' />
								</div>
								<div class='product-info'>
									<h4 v-text="item.name"></h4>
									<div>
										<span class='price' v-text="`￥${item.price}`"></span>
										<span v-text="`x ${item.count}`"></span>
									</div>
									<span>7天无理由退货</span>
								</div>
							</div>
						</div>
						<div class='invoice'>
							<span>发票类型</span>
							<span>个人电子发票<i class='iconfont icon-arrow-right'></i></span>
						</div>
						<div class='leave'>
							<span>买家留言</span>
							<input type='text' placeholder='填写内容需与商家协商并确认，45字以内' />
						</div>
					</div>
					<!-- order-discount -->
					<div class="order-discount">
						<div class="discount">
							<span>优惠券</span>
							<span>暂无可用<i class="iconfont icon-arrow-right"></i></span>
						</div>
						<div>
							<span>配送方式</span>
							<span>快递配送</span>
						</div>
					</div>
				</div>
			</div>
			<!-- page-footer -->
			<div class="page-footer">
				<div class="account">
					合计：<b>￥</b><span class="all-price" v-text="account"></span>
				</div>
				<button class="submit-order" @click="settle">提交订单</button>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'order_confirm',
	        data() {
                        return {
                                orderInfo: [],
	                        address: {},
                        }
	        },
                computed: {
                        account() {
                                var account = 0;
                                this.orderInfo.forEach(item => account = account +item.price * item.count );
                                return account;
                        },
                },
	        methods: {
                        gotoAddress() {
                                this.$cookies.set('orderAddress', this.$route.path);
                                this.$router.push('/address');
                        },
		        settle() {
                                // 获取地址id
                                let addressId = 0;
                                if(this.$cookies.get('defaultId')) {
                                        let id = this.$cookies.get('defaultId');
                                        this.$cookies.remove('defaultId');
                                        addressId = id;
                                }else {
                                        let id = this.$cookies.get('addressId');
                                        this.$cookies.remove('addressId');
                                        addressId = id;
                                };
                                // 获取订单ids
                                let ids = this.$cookies.get('ids').split(',');
                                this.$cookies.remove('ids');
				this.$axios({
					url: '/order/confirm',
					method: 'post',
					data: {
					        ids,
						addressId,
						account: this.account
					}
				})
					.then(data => {
					        this.$cookies.remove('orderAddress');
					        this.$router.replace({
						        path: '/pay',
						        query: {
						                orderNO: data
						        }
					        })
					});
		        },
	        },
		created() {
                        // 获取订单信息
                        let ids = this.$cookies.get('ids').split(',');
                        this.$axios({
	                        url: '/cart/list_ids',
	                        method: 'post',
	                        data: {
	                                ids
	                        }
                        })
	                        .then(data => this.orderInfo = data );
                        // 获取默认地址
			if(!this.$cookies.get('addressId')) {
                                this.$axios({
                                        url: '/address/get_default',
                                        method: 'get'
                                })
                                        .then(address => {
	                                        this.$cookies.set('defaultId', address.id);
                                                this.address = address
                                        });
			} else {
                                let addressId = this.$cookies.get('addressId');
                                this.$axios({
                                        url: '/address/model/' + addressId,
                                        method: 'get'
                                })
                                        .then(data => this.address = data);
			}
		},
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-order {
		height: 100%;
		width: 100%;
	}
	/* order-top */
	.order-top.show {
		display: flex;
	}
	.order-top {
		position: fixed;
		top: 0;
		width: 100%;
		height: 45px;
		border-bottom: 2px solid rgb(191, 191, 192);
		display: none;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}
	.order-top>i {
		flex-shrink: 0;
		width: 45px;
		height: 45px;
		line-height: 45px;
		text-align: center;
	}
	.order-top>span {
		flex-grow: 1;
		text-align: center;
		font-size: 16px;
		color: #333;
	}


	/* order-container */
	.order-container {
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: rgb(244, 244, 244);
	}
	.order-container>.scroll {
		flex-grow: 1;
		overflow: auto;
	}
	/* page-content */
	.page-content {
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		background-image: url('/images/cart/bg_page_header.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}
	/* order-font */
	.page-content>.order-font {
		height: 88px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.page-content>.order-font>i {
		font-size: 24px;
		width: 45px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: #eee;
	}
	.page-content>.order-font>span {
		font-size: 20px;
		font-weight: 600;
		color: #fff;
	}

	/* order-address */
	.order-address {
		height: 82px;
		border-radius: 10px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}
	.order-address>div {
		flex-grow: 1;
	}
	.order-address>div>div {
		margin-bottom: 10px;
	}
	.order-address>div>div>span {
		font-size: 16px;
		padding-right: 10px;
		font-weight: 600;
	}
	.order-address>div>p {
		font-size: 13px;
		color: #333;
	}
	.order-address>i {
		font-size: 20px;
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		color: #666;
	}



	/* order-product */
	.order-product {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		border-radius: 10px;
		background-color: #fff;
	}
	.order-product>.product {
		display: flex;
		flex-wrap: wrap;
	}
	.order-product>.product>.product-wrapper {
		display: flex;
		width: 100%;
		padding: 10px;
	}
	.order-product>.product>.product-wrapper>.img-wrap {
		flex-shrink: 0;
		width: 86px;
		height: 86px;
		border-radius: 5px;
		background-color: rgb(244, 244, 244);
	}
	.order-product>.product>.product-wrapper>.img-wrap>img {
		width: 100%;
		height: 100%;
	}
	.order-product>.product>.product-wrapper>.product-info {
		padding-left: 10px;
		flex-grow: 1;
	}
	.order-product>.product>.product-wrapper>.product-info>h4 {
		font-size: 14px;
		color: #333;
	}
	.order-product>.product>.product-wrapper>.product-info>div {
		display: flex;
		margin-top: 5px;
		justify-content: space-between;
	}
	.order-product>.product>.product-wrapper>.product-info>div>span {
		font-size: 15px;
	}
	.order-product>.product>.product-wrapper>.product-info>div>span.price {
		color: rgb(191, 17, 17);
	}
	.order-product>.product>.product-wrapper>.product-info>span {
		height: 15px;
		padding: 2px 5px;
		font-size: 10px;
		border-radius: 7.5px;
		color: rgb(191, 17, 17);
		background-color: rgb(255, 244, 244);
	}
	.order-product>.invoice {
		font-size: 16px;
		height: 42px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
	}
	.order-product>.invoice>span {}
	.order-product>.invoice>span>i {}
	.order-product>.leave {
		height: 42px;
		display: flex;
		justify-content: left;
		align-items: center;
	}
	.order-product>.leave>span {
		font-size: 16px;
	}
	.order-product>.leave>input {
		width: 300px;
		height: 21px;
		margin-left: 10px;
	}

	/* order-discount */
	.order-discount {
		margin: 10px 0;
		border-radius: 10px;
		background-color: #fff;
	}
	.order-discount>div {
		font-size: 16px;
		height: 46px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}
	.order-discount>div>span {}
	.order-discount>div>span>i {}




	/* page-footer */
	.page-footer {
		position: relative;
		z-index: 5;
		height: 54px;
		flex-shrink: 0;
		padding: 0 10px;
		box-shadow: 0 -3px 5px 0 #ccc;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}
	.page-footer>.account {
		font-size: 14px;
		color: #333;
	}
	.page-footer>.account>b {
		font-size: 16px;
		color: rgb(191, 17, 17);
	}
	.page-footer>.account>span.all-price {
		font-size: 22px;
		color: rgb(191, 17, 17);
	}
	.page-footer>button.submit-order {
		width: 100px;
		height: 38px;
		border-radius: 19px;
		line-height: 38px;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background-color: rgb(191, 17, 17);
	}
</style>