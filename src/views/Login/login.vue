<template>
	<!-- login-container -->
	<div class="login-container">
		<!-- login-top -->
		<div class="login-top">
			<h2>欢迎登录小米有品</h2>
		</div>
		<!-- login-content -->
		<div class="login-content">
			<!-- login-user -->
			<div class="login-user show">
				<div class="login-toggle">
					<router-view></router-view>
					<router-link to="/login/phone" v-show="$route.path === '/login/pwd'">手机验证码登录</router-link>
					<router-link to="/login/pwd" v-show="$route.path === '/login/phone'">用户名密码登录</router-link>
				</div>
				<div class="edit-mode">
					<a href="/pages/register/index.html">立即注册</a>
					<b>|</b>
					<a href="">忘记密码？</a>
				</div>
			</div>
		</div>
		<!-- login-bottom -->
		<div class="login-bottom">
			<div class="other-login">
				<p>其它方式登录</p>
				<a href=""></a>
				<a href=""></a>
				<a href=""></a>
				<a href=""></a>
			</div>
			<div class="other-font">
				<span class="show">简体</span>
				<b>|</b>
				<span>繁体</span>
				<b>|</b>
				<span>English</span>
				<b>|</b>
				<span>常见问题</span>
				<b>|</b>
				<span>隐私政策</span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: 'login',
	};
</script>

<style lang="stylus" type="text/stylus" scoped>

	/* login-container */
	.login-container {
		height 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/* login-top */
	.login-top {}
	.login-top>h2 {
		margin-bottom: 40px;
		font-size: 24px;
		color: #666;
	}


	/* login-content */
	.login-content {}
	.login-content>div {}
	.login-content>div>.edit-mode {
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}
	.login-content>div>.edit-mode>a {
		font-size: 16px;
		color: #9b9b9b;
	}
	.login-content>div>.edit-mode>b {
		font-size: 14px;
		color: #666;
		padding: 0 10px;
	}
	.login-user>form>label>input[name=btn-toggle] {
		height: 45px;
		font-size: 18px;
		border-radius: 27.5px;
		color: #333;
		background: rgba(0,0,0,.06);
	}
	.login-toggle>a {
		width: 320px;
		height: 55px
		display: block;
		line-height 55px;
		text-align: center;
		border-radius: 27.5px;
		color: #333;
		background-color: #eee;
	}


	/* login-bottom */
	.login-bottom {
		margin-top: 40px;
	}
	.login-bottom>.other-login {
		text-align: center;
	}
	.login-bottom>.other-login>p {
		padding-bottom: 20px;
		text-align: center;
		font-size: 13px;
		color: #333;
	}
	.login-bottom>.other-login>a {
		margin: 0 10px;
		border-radius: 50%;
		display: inline-block;
		width: 30px;
		height: 30px;
		background-image: url('/images/login/icons_type.png');
		background-repeat: no-repeat;
		background-size: 154.555555px 26px;
	}
	.login-bottom>.other-login>a:nth-child(2) {
		background-image: url('/images/login/apple.png');
		background-size: 24px;
		background-position: 3px 2px;
		background-color: #000;
	}
	.login-bottom>.other-login>a:nth-child(3) {
		background-position: -52px 2px;
		background-color: #ed9090;
	}
	.login-bottom>.other-login>a:nth-child(4) {
		background-size: 118.888888px 20px;
		background-position: -62px 5px;
		background-color: #6bb6ea;
	}
	.login-bottom>.other-login>a:nth-child(5) {
		background-size: 118.888888px 20px;
		background-position: -91px 5px;
		background-color: #00be00;
	}
	.login-bottom>.other-font {
		margin-top: 80px;
	}
	.login-bottom>.other-font>span {
		padding: 0 5px;
		font-size: 14px;
		color: #9b9b9b;
	}
	.login-bottom>.other-font>span.show {
		color: #191919;
	}
	.login-bottom>.other-font>b {
		font-size: 14px;
		color: #9b9b9b;
	}


</style>