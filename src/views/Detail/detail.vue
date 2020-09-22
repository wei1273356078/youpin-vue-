<template>
		<!-- detail-container -->
		<div class="detail-container">
			<!-- detail-header -->
			<div class="detail-header">
				<div class="more">
					<a @click="$router.back()" class="iconfont icon-back show"></a>
					<div class="info-font">
						<span class="show">商品</span>
						<span>评价</span>
						<span>详情</span>
					</div>
					<i class="iconfont icon-shenglve show"></i>
				</div>
			</div>
			<!-- detail-content -->
			<div class=" scroll detail-content">
				<div class="hide-scroll">
					<div class="banner swiper-container">
						<swiper :options="swiperOptions">
							<swiper-slide v-for="(item, i) in banner" :key="i"><img :src="item" /></swiper-slide>
						</swiper>
					</div>
					<div class="info-content">
						<div class="content-top part-top">
							<div>
								<div class='price'>
									<span v-text="`￥${proInfo.price}`"></span>
									<img src='/images/detail/icon_product_unfavor.png' />
								</div>
								<div class='name'>
									<img src='/images/detail/tag_self.png' />
									<span v-text="proInfo.name"></span>
								</div>
								<p class='ellipsis' v-text="proInfo.brief"></p>
								<span class='rate' v-text="`评论：${proInfo.rate}`"></span>
								<span class='sale' v-text="`销量：${proInfo.sale}`"></span>
							</div>
							<div class='new-gift'><img src='/images/detail/new_gift.png' /></div>
						</div>
						<div class="content-middle">
							<!-- product-count -->
							<div class="product-count" @click="isMask = true">
								<div class="p-c">
									<div class="p-c-left">
										<span class="select">已选</span>
										<span class="count" v-text="`${count}件`"></span>
									</div>
									<i class="iconfont icon-arrow-right"></i>
								</div>
							</div>
							<!-- product-address -->
							<div class="product-address">
								<div class="p-c">
									<div class="p-c-left">
										<span class="select">送至</span>
										<span class="count">北京市 海淀区</span>
									</div>
									<i class="iconfont icon-arrow-right"></i>
								</div>
							</div>
							<!-- product-serve -->
							<div class="product-serve">
								<div class="p-c">
									<div class="p-c-left">
										<span class="select">服务</span>
										<span class="count">
											<i class="iconfont icon-duigou"></i>满99包邮
											<i class="iconfont icon-duigou"></i>小米自营
											<i class="iconfont icon-duigou"></i>7天无理由
										</span>
									</div>
									<i class="iconfont icon-arrow-right"></i>
								</div>
							</div>
						</div>
						<div class="content-bottom">
							<div class="remark-font part-top"><img
								src="/images/detail/rate6.png"/></div>
							<div class="remark-wrap scroll1">
								<div class="remark hide-scroll">
									<img src="/images/detail/rate1.png"/>
									<img src="/images/detail/rate2.png"/>
									<img src="/images/detail/rate3.png"/>
									<img src="/images/detail/rate4.png"/>
									<img src="/images/detail/rate5.png"/>
								</div>
							</div>
							<div class="answer"><img src="/images/detail/answers.png"/>
							</div>
							<div class="mi-self part-top"><img src="/images/detail/mi_self.png"/></div>
							<div class="other-image" v-for="(item, i) in otherImgs" :key="i">
								<img :src="item" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- detail-nav -->
			<div class="detail-nav">
				<div class="nav-xiaomi">
					<img src="/images/detail/mi_icon.png"/>
					<span>小米</span>
				</div>
				<div class="nav-cart" @click="$router.push('/cart')">
					<i class="iconfont icon-cart"></i>
					<span>购物车</span>
					<b v-text="total"></b>
				</div>
				<div class="nav-buy">
					<span class="add-cart" @click="addCart">加入购物车</span>
					<span class="buy">立即购买</span>
				</div>
			</div>
			<!-- masking -->
			<div class="masking-count" v-show="isMask">
				<div class="masking-content">
					<i class="iconfont icon-cha" @click="isMask = false"></i>
					<div class='masking-price'>
						<div class='img-wrap'><img :src='proInfo.avatar' /></div>
						<div class='font-wrap'>
							<p>￥<span v-text="proInfo.price"></span></p>
							<div>已选：<span class='account' v-text="count"></span>件</div>
						</div>
					</div>
					<div class='masking-number'>
						<span>数量</span>
						<div>
							<span class='decrease' @click="decrease">-</span>
							<span class='count' v-text="count"></span>
							<span class='increase' @click="increase">+</span>
						</div>
					</div>
					<div class='masking-buy'>
						<span class='ok' @click="isMask = false">确认</span>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
        import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
        import 'swiper/swiper-bundle.css';

        export default {
                name: 'detail',
                components: {
                        Swiper,
                        SwiperSlide
                },
                directives: {
                        swiper: directive
                },
	        data() {
                        return {
                                count: 1,
                                isMask: false,
                                total: 0,
                                proInfo: {},
	                        banner: [],
                                otherImgs: [],
                                swiperOptions: {
                                        pagination: {
                                                el: '.swiper-pagination',
                                                clickable: true,   // 点击指示器可以切换
                                        },
                                        loop: true,   // 是否无缝
                                        grabCursor: true,
                                        autoplay: {
                                                delay: 5000,
                                                disableOnInteraction: false
                                        },
                                }
                        }
	        },
	        methods: {
                        addCart() {
                                if(!this.$cookies.get('token')) {
                                        this.$router.push({
	                                        path: '/login',
	                                        query: {
	                                                back: this.$route.path
	                                        }
                                        })
	                                return
                                }
                                this.$axios({
	                                url: '/cart/add',
	                                method: 'post',
	                                data: {
	                                        pid: this.$route.params.pid,
		                                count: this.count
	                                }
                                })
	                                .then(data => {
	                                        this.total = this.total + this.count;
	                                        this.$alert('加入购物车成功');
	                                });
                        },
                        increase() {
                                if(this.count >= 20) return this.$alert('已达到最大购买数量');
                                this.count = this.count + 1;
                        },
		        decrease() {
                                if(this.count <= 1) return this.$alert('已达到最少数量');
                                this.count = this.count - 1;
		        },
	        },
	        created() {
			// 请求数据
		        this.$axios({
			        url: '/product/model/' +  this.$route.params.pid,
			        method: 'get'
		        })
			        .then(data => {
			                console.log(data);
			                this.otherImgs = data.otherImgs.split(',');
			                this.banner = data.bannerImgs.split(',');
			                this.proInfo = data;
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
	        },
        };
</script>

<style scoped>
	body {
		/* font-size: 0; */
		background-color: rgb(248, 248, 248);
	}
	/* detail-container */
	.detail-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	/* detail-header */
	.detail-header {
		flex-shrink: 0;
		width: 100%;
		height: 48px;
		position: fixed;
		top: 0;
		z-index: 5;
	}

	.detail-header>.more {
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		transition: all 0.5s;
		background-color: rgba(239, 239, 240, 0);
	}
	.detail-header>.more.show {
		background-color: rgba(239, 239, 240, 1);
	}
	.detail-header>.more>a.show {
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
	}
	.detail-header>.more>a {
		font-size: 24px;
		height: 28px;
		width: 28px;
		line-height: 28px;
		text-align: center;
		color: #333;
		transition: all 0.5s;
	}
	.detail-header>.more>i.show {
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
	}
	.detail-header>.more>i {
		font-size: 24px;
		height: 28px;
		width: 28px;
		line-height: 28px;
		text-align: center;
		color: #333;
		transition: all 0.5s;
	}
	.detail-header>.more>.info-font.show {
		opacity: 1;
		z-index: 10;
	}
	.detail-header>.more>.info-font {
		position: relative;
		z-index: -5;
		opacity: 0;
		transition: all 0.5s;
	}
	.detail-header>.more>.info-font>span {
		padding: 10px;
		font-size: 14px;
	}
	.detail-header>.more>.info-font>span.show {
		color: rgb(132, 95, 63);
		border-bottom: 1px solid rgb(132, 95, 63);
	}

	/* detail-content */
	.detail-content {
		flex-grow: 1;
		/*overflow: auto;*/
		width: 100%;
	}
	.detail-content>div {
		overflow: auto;
	}
	/* scroll */
	.scroll {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		touch-action: pan-y;
	}
	.scroll>div {}
	/* banner */
	.banner {
		width: 100%;
	}
	.banner>div {
		width: 100%;
	}
	.banner>div>div {
		width: 100%;
	}
	.banner>div>div>div {
		width: 100%;
	}
	.banner>div>div>div>img {
		width: 100%;
	}
	/* info-content */
	.info-content {
		display: flex;
		flex-direction: column;
	}
	/* content-top */
	.info-content>.content-top {
	}
	.info-content>.content-top>div {
		width: 100%;
		box-sizing: border-box;
		padding: 0 10px;
		background-color: #fff;
	}
	.info-content>.content-top>div>.price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 15px;
	}
	.info-content>.content-top>div>.price>span {
		font-size: 25px;
		color: rgb(182, 9, 9);
	}
	.info-content>.content-top>div>.price>img {
		width: 38px;
	}
	.info-content>.content-top>div>.name {
		display: flex;
		justify-content: left;
		align-items: center;
		margin-top: 15px;
	}
	.info-content>.content-top>div>.name>img {
		height: 25px;
	}
	.info-content>.content-top>div>.name>span {
		padding-left: 5px;
		font-size: 17px;
		font-weight: 600;
		color: #333;
	}
	.info-content>.content-top>div>p {
		margin-top: 10px;
		font-size: 13px;
		color: #333;
	}
	.info-content>.content-top>div>span {
		display: inline-block;
		margin-top: 10px;
		font-size: 15px;
		color: #333;
		padding-bottom: 10px;
	}
	.info-content>.content-top>div>span.rate {}
	.info-content>.content-top>div>span.sale {}
	.info-content>.content-top>.new-gift {
		margin: 10px 0;
		width: 100% ;
	}
	.info-content>.content-top>.new-gift>img {
		width: 100%;
	}

	/* content-middle */
	.content-middle {
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.content-middle>.product-count {
		border-bottom: 1px solid #ccc;
	}
	.content-middle>.product-count>.p-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}
	.content-middle>.product-count>.p-c>.p-c-left {
		height: 48px;
		line-height: 48px;
	}
	.content-middle>.product-count>.p-c>.p-c-left>span.select {
		font-size: 12px;
		padding-right: 20px;
		color: #999;
	}
	.content-middle>.product-count>.p-c>.p-c-left>span.count {
		font-size: 13px;
		font-weight: 600;
		color: #333;
	}
	.content-middle>.product-count>.p-c>i {}


	.content-middle>.product-address {
		border-bottom: 1px solid #ccc;
	}
	.content-middle>.product-address>.p-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}
	.content-middle>.product-address>.p-c>.p-c-left {
		height: 48px;
		line-height: 48px;
	}
	.content-middle>.product-address>.p-c>.p-c-left>span.select {
		font-size: 12px;
		padding-right: 20px;
		color: #999;
	}
	.content-middle>.product-address>.p-c>.p-c-left>span.count {
		font-size: 13px;
		font-weight: 600;
		color: #333;
	}
	.content-middle>.product-address>.p-c>i {}



	.content-middle>.product-serve {}
	.content-middle>.product-serve>.p-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}
	.content-middle>.product-serve>.p-c>.p-c-left {
		height: 48px;
		line-height: 48px;
	}
	.content-middle>.product-serve>.p-c>.p-c-left>span.select {
		font-size: 12px;
		padding-right: 20px;
		color: #999;
	}
	.content-middle>.product-serve>.p-c>.p-c-left>span.count {
		font-size: 13px;
		font-weight: 600;
		color: #333;
	}
	.content-middle>.product-serve>.p-c>.p-c-left>span.count>i {
		margin-right: 5px;
		color: #bf1111;
	}
	.content-middle>.product-serve>.p-c>i {}

	/* content-bottom */
	.info-content>.content-bottom {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
	}
	.info-content>.content-bottom>.remark-font {
		width: 100%;
		margin-bottom: -4px;
	}
	.info-content>.content-bottom>.remark-font>img {
		width: 100%;
	}
	.info-content>.content-bottom>.remark-wrap {
		overflow: hidden;
		touch-action: pan-x;
		background-color: #fff;
	}
	.info-content>.content-bottom>.remark-wrap>.remark {
		display: inline-block;
		overflow: auto;
		width: 400px;
		white-space: nowrap;
		padding: 0 10px;
	}
	.info-content>.content-bottom>.remark-wrap>.remark>img {
		padding-right: 10px;
	}
	.info-content>.content-bottom>.answer {
		width: 100%;
		margin: 10px 0;
	}
	.info-content>.content-bottom>.answer>img {
		width: 100%;
	}
	.info-content>.content-bottom>.mi-self {
		width: 100%;
		margin-bottom: 6px;
	}
	.info-content>.content-bottom>.mi-self>img {
		width: 100%;
	}
	.info-content>.content-bottom>.other-image {
		font-size: 0;
		width: 100%;
	}
	.info-content>.content-bottom>.other-image>img {
		width: 100%;
	}

	/* detail-nav */
	.detail-nav {
		flex-shrink: 0;
		height: 60px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.detail-nav>.nav-xiaomi {
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.detail-nav>.nav-xiaomi>img {
		width: 30px;
	}
	.detail-nav>.nav-xiaomi>span {
		font-size: 12px;
	}
	.detail-nav>.nav-cart {
		position: relative;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.detail-nav>.nav-cart>i {
		font-size: 26px;
	}
	.detail-nav>.nav-cart>span {
		font-size: 12px;
	}
	.detail-nav>.nav-cart>b {
		position: absolute;
		top: -5px;
		right: -5px;
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		border-radius: 50%;
		color: #fff;
		background-color: rgb(227, 13, 13);
	}
	.detail-nav>.nav-buy {
		display: flex;
	}
	.detail-nav>.nav-buy>span {
		text-align: center;
		line-height: 38px;
		width: 140px;
		height: 38px;
		font-weight: 600;
		color: #fff;
	}
	.detail-nav>.nav-buy>span.add-cart {
		border-top-left-radius: 19px;
		border-bottom-left-radius: 19px;
		background: linear-gradient(to right, rgb(240, 206, 123), rgb(221, 177, 81));
	}
	.detail-nav>.nav-buy>span.buy {
		border-top-right-radius: 19px;
		border-bottom-right-radius: 19px;
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
	}




	/* masking */
	.masking-count {
		display: block;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.masking-count>.masking-content {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
		height: 60vh;
		width: 100%;
		background-color: #fff;
	}
	.masking-count>.masking-content>i {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 24px;
	}

	/* masking-price */
	.masking-count>.masking-content>.masking-price {
		display: flex;
		align-items: center;
		padding: 20px 10px;
	}
	.masking-count>.masking-content>.masking-price>.img-wrap {
		border-radius: 5px;
		margin-right: 10px;
		background-color: rgb(232, 232, 232);
	}
	.masking-count>.masking-content>.masking-price>.img-wrap>img {
		width: 90px;
	}
	.masking-count>.masking-content>.masking-price>.font-wrap>p {
		font-size: 10px;
		margin-bottom: 10px;
		color: rgb(182, 9, 9);
	}
	.masking-count>.masking-content>.masking-price>.font-wrap>p>span {
		font-size: 20px;
	}
	.masking-count>.masking-content>.masking-price>.font-wrap>div {
		font-size: 13px;
		color: #666;
	}
	.masking-count>.masking-content>.masking-price>.font-wrap>div>span.account {}

	/* .masking-number */
	.masking-count>.masking-content>.masking-number {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30px 0 10px;
	}
	.masking-count>.masking-content>.masking-number>span {
		font-size: 13px;
		color: #999;
	}
	.masking-count>.masking-content>.masking-number>div {
		display: flex;
		width: 100px;
		justify-content: space-between;
	}
	.masking-count>.masking-content>.masking-number>div>span.decrease {
		font-size: 24px;
		color: #666;
	}
	.masking-count>.masking-content>.masking-number>div>span.count {
		width: 48px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #f4f4f4;
	}
	.masking-count>.masking-content>.masking-number>div>span.increase {
		font-size: 24px;
		color: #666;
	}

	/* masking-buy */
	.masking-count>.masking-content>.masking-buy {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
	}
	.masking-count>.masking-content>.masking-buy>span {
		height: 44px;
		width: 90vw;
		font-size: 17px;
		font-weight: 600;
		text-align: center;
		line-height: 44px;
		color: #fff;
	}
	.masking-count>.masking-content>.masking-buy>span.ok {
		border-radius: 22px;
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
	}



</style>