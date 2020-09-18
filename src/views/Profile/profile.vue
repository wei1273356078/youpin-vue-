<template>
		<div class="profile-container">
			<div class="page-header">
				<!-- 未登录 -->
				<div class="empty">
					<div class="avatar-wrap">
						<img src="/images/profile/avatar.png" />
						<span>请登录</span>
					</div>
					<i class="iconfont icon-arrow-right"></i>
				</div>
				<!-- 登录 -->
				<div class="login">
					<img src="/images/profile/avatar.png" />
					<span class="user"></span>
				</div>
			</div>
			<div class="page-content">
				<div class="content-top">
					<div class="order">
						<span>我的订单</span>
						<i class="iconfont icon-arrow-right"></i>
					</div>
					<div class="icon-bar">
						<div>
							<img src="/images/profile/dai_fu_kuan.png" />
							<span>待付款</span>
						</div>
						<div>
							<img src="/images/profile/dai_shou_huo.png" />
							<span>待收货</span>
						</div>
						<div>
							<img src="/images/profile/remark.png" />
							<span>评价</span>
						</div>
						<div>
							<img src="/images/profile/shou_hou.png" />
							<span>退款/售后</span>
						</div>
					</div>
				</div>
				<div class="content-middle">
					<div>
						<div>
							<img src="/images/profile/icon_assets.png" />
							<span>我的资产</span>
						</div>
						<div>
							<span class="youhui">优惠券/积分</span>
							<i class="iconfont icon-arrow-right"></i>
						</div>
					</div>
					<div>
						<div>
							<img src="/images/profile/icon_collection.png" />
							<span>我的收藏</span>
						</div>
						<div>
							<i class="iconfont icon-arrow-right"></i>
						</div>
					</div>
					<div class="address">
						<div>
							<img src="/images/profile/icon_address.png" />
							<span>地址管理</span>
						</div>
						<div>
							<i class="iconfont icon-arrow-right"></i>
						</div>
					</div>
				</div>
				<div class="content-bottom">
					<div>
						<div>
							<img src="/images/profile/icon_qualifi.png" />
							<span>资质证照</span>
						</div>
						<div><i class="iconfont icon-arrow-right"></i></div>
					</div>
					<div>
						<div>
							<img src="/images/profile/icon_protocol.png" />
							<span>协议规则</span>
						</div>
						<div><i class="iconfont icon-arrow-right"></i></div>
					</div>
					<div>
						<div>
							<img src="/images/profile/icon_feedback.png" />
							<span>帮助与反馈  </span>
						</div>
						<div><i class="iconfont icon-arrow-right"></i></div>
					</div>
				</div>
				<span class="exit">退出</span>
			</div>
			<div class="page-footer">
				<miNav></miNav>
			</div>
		</div>
</template>

<script>
	import miNav from '@/components/MiNav';

	export default {
	        name: 'profile',
		components: {
	                miNav
		},
		created() {
	                setInterval()
		}
	};
</script>

<style scoped>
	/* profile-container */
	.profile-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: rgb(244, 244, 244);
	}

	/* page-header */
	.page-header {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		padding: 0 20px;
		height: 100px;
		background-image: url('/images/profile/bg_top.png');
		background-size: 100%;
		background-repeat: no-repeat;
	}
	/* 未登录 */
	.page-header>.empty.show {
		display: flex;
	}
	.page-header>.empty {
		display: none;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.page-header>.empty>.avatar-wrap {
		display: flex;
		align-items: center;
	}
	.page-header>.empty>.avatar-wrap>img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.page-header>.empty>.avatar-wrap>span {
		font-size: 14px;
		padding-left: 20px;
		font-weight: 600;
		color: #fff;
	}
	.page-header>.empty>i {
		font-size: 24px;
		color: #bbb;
	}


	/* 登录 */
	.page-header>.login.show {
		display: flex;
	}
	.page-header>.login {
		display: none;
		align-items: center;
	}
	.page-header>.login>img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.page-header>.login>span.user {
		font-size: 14px;
		padding-left: 20px;
		color: #fff;
	}

	/* page-content */
	.page-content {
		flex-grow: 1;
		height: 100%;
		margin-top: 5px;
	}
	/* 退出登录 */
	.page-content>span.exit.show {
		display: block;
	}
	.page-content>span.exit {
		margin: 0 auto;
		font-size: 14px;
		display: none;
		height: 45px;
		width: 100px;
		line-height: 45px;
		text-align: center;
		border-radius: 5px;
		border: 1px solid rgb(178, 178, 178);
		background-color: #fff;
	}


	/* content-top */
	.content-top {
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.content-top>.order {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		padding: 0 20px;
		border-bottom: 1px solid rgb(229, 229, 229);
	}
	.content-top>.order>span {
		font-size: 14px;
		color: #333;
	}
	.content-top>.order>i {
		font-size: 18px;
	}
	.content-top>.icon-bar {
		height: 80px;
		display: flex;
	}
	.content-top>.icon-bar>div {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.content-top>.icon-bar>div>img {
		width: 40px;
		height: 40px;
	}
	.content-top>.icon-bar>div>span {
		font-size: 12px;
		color: #00000099;
	}
	/* content-middle */
	.content-middle {
		margin: 5px 0;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.content-middle>div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 49px;
		padding: 0 20px;
		border-bottom: 1px solid rgb(229, 229, 229);
	}
	.content-middle>div>div {
		display: flex;
		align-items: center;
	}
	.content-middle>div>div>img {
		width: 38px;
		height: 38px;
	}
	.content-middle>div>div>span {
		font-size: 14px;
		color: #333;
	}
	.content-middle>div>div>span.youhui {
		font-size: 12px;
		color: #999;
	}
	.content-middle>div>div>i {
		font-size: 18px;
	}

	/* content-bottom */
	.content-bottom {
		margin: 5px 0;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.content-bottom>div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 49px;
		padding: 0 20px;
		border-bottom: 1px solid rgb(229, 229, 229);
	}
	.content-bottom>div>div {
		display: flex;
		align-items: center;
	}
	.content-bottom>div>div>img {
		width: 38px;
		height: 38px;
	}
	.content-bottom>div>div>span {
		font-size: 14px;
		color: #333;
	}
	.content-bottom>div>div>span.youhui {
		font-size: 12px;
		color: #999;
	}
	.content-bottom>div>div>i {
		font-size: 18px;
	}
	/* page-footer */
	.page-footer {
		height: 50px;
		flex-shrink: 0;
		background-color: #fff;
	}
</style>