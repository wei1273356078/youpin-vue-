<template>
	<!-- pay-content -->
	<div class="pay-container">
		<!-- pay-header -->
		<div class="pay-header">
			<i class="iconfont icon-back prev-back" @click="$router.replace('/my_order')"></i>
			<span>有品收银台</span>
			<i></i>
		</div>
		<!-- pay-content -->
		<div class="pay-content">
			<div class="price-time">
				<span class="symbol">￥</span>
				<span class="account" v-text="account"></span>
				<span class="decimals">.00</span>
				<p>支付剩余时间:
					<time class="valid-time" v-text="`${minute} : ${second}`"></time>
				</p>
			</div>
			<div class="pay-method">
				<div class="pay-alipay" @click="isAlipay = true">
					<div>
						<img src="/images/pay/pay_alipay.png"/>
						<span>支付宝</span>
						<b>推荐</b>
					</div>
					<i class="checkbox" :class="{ check: isAlipay }"></i>
				</div>
				<div class="pay-mipay" @click="isAlipay = false">
					<div>
						<img src="/images/pay/pay_mipay.png"/>
						<span>小米钱包</span>
					</div>
					<i class="checkbox" :class="{ check: !isAlipay }"></i>
				</div>
			</div>
		</div>
		<!-- pay-footer -->
		<div class="pay-footer">
			<button class="btn-pay" @click="confirmPay">确认支付￥<span v-text="account"></span></button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'pay',
	        data() {
                        return {
                                isAlipay: true,
	                        account: 0,
	                        timer: null,
	                        minute: 0,
	                        second: 0
                        }
	        },
	        computed: {},
	        methods: {
                        confirmPay() {
                                this.$axios({
	                                url: '/order/pay/' + this.$route.query.orderNO,
	                                method: 'get'
                                })
	                                .then(res => {
	                                        this.$router.replace('/my_order');
	                                });
                        },
                        _validTime(time) {
                                this.timer = setInterval(() =>{
                                        let nowTime = new Date().getTime(),
                                                validTime = time - nowTime;
                                        if(validTime > 0){
                                                let minute = Math.floor(validTime / 1000 / 60);
	                                        let second = Math.floor(validTime / 1000 % 60);
                                                minute = minute > 9?minute:'0' + minute;
                                                second = second > 9?second:'0' + second;
                                                this.minute = minute;
                                                this.second = second;
                                        }else{
                                                clearInterval(this.timer);
                                                confirm('订单已失效，请重新下单', function(){
                                                        this.$router.replace('/my_order');
                                                });
                                        }
                                }, 1000);
                        }
	        },
	        created() {
                        this.$axios({
	                        url: '/order/account/' + this.$route.query.orderNO
                        })
	                        .then(account => {
	                                this.account = account;
	                                this.$axios({
		                                url: '/order/list_all',
		                                method: 'get'
	                                })
		                                .then(res => {
		                                        let time = res.filter(item => item.orderId === this.$route.query.orderNO)[0].orderTime;
		                                        // 设置有效时间为30分钟
			                                time = new Date(time).getTime() + 1800000;
                                                        this._validTime(time);
		                                });
	                        });
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


	/* pay-container */
	.pay-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: rgb(244, 244, 244);
	}

	/* pay-header */
	.pay-header {
		height: 42px;
		flex-shrink: 0;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.pay-header>i {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		font-size: 24px;
		color: #666;
	}
	.pay-header>span {
		flex-grow: 1;
		font-size: 18px;
		text-align: center;
		color: #333;
	}

	/* pay-content */
	.pay-content {
		padding: 0 10px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.pay-content>.price-time {
		height: 90px;
		width: 100%;
		margin-top: 20px;
		text-align: center;
	}
	.pay-content>.price-time>span {
		font-size: 16px;
		color: #d71d1d;
	}
	.pay-content>.price-time>span.account {
		font-size: 25px;
	}
	.pay-content>.price-time>p {
		margin-top: 5px;
		font-size: 16px;
		text-align: center;
		color: #d71d1d;
	}
	/* pay-method */
	.pay-method {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		background-color: #fff;
	}
	.pay-method>div {
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.pay-method>div>div {
		height: 65px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.pay-method>div>div>img {
		width: 33px;
		height: 33px;
	}
	.pay-method>div>div>span {
		font-size: 16px;
		padding: 0 10px;
	}
	.pay-method>div>div>b {
		font-size: 10px;
		padding: 1px 4px;
		border-radius: 6px;
		color: #fff;
		background: linear-gradient(to right, rgb(241, 83, 56), rgb(223, 20, 15));
	}
	.pay-method>div>i.checkbox {
		width: 18px;
		height: 18px;
		background-image: url('/images/pay/icon_checkbox_uncheck_darkgray.png');
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.pay-method>div>i.check {
		background-image: url('/images/pay/icon_checkbox_check_brown.png');
	}

	/* pay-footer */
	.pay-footer {
		height: 60px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
	.pay-footer>button.btn-pay {
		font-size: 18px;
		font-weight: 600;
		height: 42px;
		width: 94vw;
		line-height: 42px;
		text-align: center;
		border-radius: 21px;
		color: #fff;
		background: linear-gradient(to right, rgb(241, 83, 56), rgb(223, 20, 15));
	}


</style>