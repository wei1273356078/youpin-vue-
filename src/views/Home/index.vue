<template>
		<div class="home-container">
			<!-- page-header -->
			<div class="page-header">
				<img src="/images/home/logo.png" />
				<div class="search">
					<img src="/images/category/icon_search.png" />
					<input type="text" placeholder="搜一搜" />
				</div>
			</div>
			<!-- page-content -->
			<div class="hide-scroll page-content">
				<!-- banner -->
				<div class="banner">
					<swiper ref="swiper">
						<swiper-slide><img src="/images/home/banner01.jpg" /></swiper-slide>
						<swiper-slide><img src="/images/home/banner02.jpg" /></swiper-slide>
						<swiper-slide><img src="/images/home/banner03.jpg" /></swiper-slide>
						<swiper-slide><img src="/images/home/banner04.jpg" /></swiper-slide>
						<swiper-slide><img src="/images/home/banner05.jpg" /></swiper-slide>
						<swiper-slide><img src="/images/home/banner06.jpg" /></swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
				<!-- title -->
				<div class="title">
					<div>
						<img src="/images/home/shang_xin.png" />
						<span>每日上新</span>
					</div>
					<div>
						<img src="/images/home/zhong_chou.png" />
						<span>小米众筹</span>
					</div>
					<div>
						<img src="/images/home/miao_sha.png" />
						<span>有品秒杀</span>
					</div>
					<div>
						<img src="/images/home/pai_hang.png" />
						<span>热销排行</span>
					</div>
					<div>
						<img src="/images/home/zi_ying.png" />
						<span>小米自营</span>
					</div>
					<div>
						<img src="/images/home/li_fan.png" />
						<span>下单立返</span>
					</div>
					<div>
						<img src="/images/home/bao_you.png" />
						<span>9.9包邮</span>
					</div>
					<div>
						<img src="/images/home/zhi_bo.png" />
						<span>有品直播</span>
					</div>
					<div>
						<img src="/images/home/zhuang_yuan.png" />
						<span>小米庄园</span>
					</div>
					<div>
						<img src="/images/home/sheng_huo.png" />
						<span>智能生活</span>
					</div>
				</div>
				<!-- plaza -->
				<div class="plaza">
					<div><img src="/images/home/plaza1.png" /></div>
					<div><img src="/images/home/plaza2.png" /></div>
					<div><img src="/images/home/plaza3.png" /></div>
					<div><img src="/images/home/plaza4.png" /></div>
				</div>
				<div class="content">
					<img src="/images/home/content.png" >
				</div>
			</div>
			<!-- page-footer -->
			<div class="page-footer">
				<miNav :total="total"></miNav>
			</div>
		</div>
</template>

<script>
	import miNav from '@/components/MiNav';
        import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
        import 'swiper/swiper-bundle.css';

	export default {
	        name: 'home',
		components: {
	                miNav,
                        Swiper,
                        SwiperSlide
		},
                directives: {
                        swiper: directive
                },
		data() {
			return {
			        total: 0,
			}
		},
//		watch: {
//                        swiper: function(newValue, oldValue){
//				console.log(newValue)
//                        }
//		},
		mounted() {
                        let swiper = new Swiper(this.$refs.swiper, {
                                loop: true,   // 是否无缝
                                grabCursor: true,
                                autoplay: {   // 自动播放
                                        delay: 5000,   // 切换间隔时间
                                        disableOnInteraction: false,  // 用户操作完可以自动轮播
                                },
                                pagination: {
                                        el: '.swiper-pagination',
                                        clickable: true,   // 点击指示器可以切换
                                },
                        });
		},
		created() {
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
	/* home-container */
	.home-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: rgb(244, 244, 244);
	}
	/* page-header */
	.page-header {
		height: 60px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: rgb(132, 93, 50);
	}
	.page-header>img {
		width: 40px;
	}
	.page-header>.search {
		position: relative;
	}
	.page-header>.search>img {
		position: absolute;
		top: 6.5px;
		left: 10px;
		width: 22px;
	}
	.page-header>.search>input {
		font-size: 15px;
		text-indent: 3em;
		height: 35px;
		width: 335px;
		border-radius: 17.5px;
		color: #333;
		background-color: rgb(240, 240, 240);
	}



	/* page-content */
	.page-content {
		overflow: auto;
		flex-grow: 1;
	}
	.page-content>.banner {}
	.page-content>.banner>.swiper-container {
		height: 180px;
	}
	.page-content>.banner>.swiper-container>div {}
	.page-content>.banner>.swiper-container>div>div {}
	.page-content>.banner>.swiper-container>div>div>img {
		height: 100%;
	}
	/* title */
	.page-content>.title {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
	}
	.page-content>.title>div {
		box-sizing: border-box;
		width: 20%;
		padding: 0 10px;
		margin: 10px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.page-content>.title>div>img {
		width: 100%;
	}
	.page-content>.title>div>span {
		padding-top: 5px;
		font-size: 13px;
	}
	/* plaza */
	.page-content>.plaza {
		margin-top: 10px;
		box-sizing: border-box;
		padding: 0 10px;
		display: flex;
		width: 100%;

	}
	.page-content>.plaza>div {
		width: 25%;
		box-sizing: border-box;
		padding: 0 2px;
	}
	.page-content>.plaza>div>img {
		width: 100%;
	}


	/* page-footer */
	.page-footer {
		height: 50px;
		flex-shrink: 0;
		background-color: #fff;
	}
</style>