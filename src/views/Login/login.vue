<template>
	<div>
		<router-view></router-view>
		<router-link to="/login/phone" v-show="$route.path === '/login/pwd'">手机验证码登录</router-link>
		<router-link to="/login/pwd" v-show="$route.path === '/login/phone'">用户名密码登录</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: 'login',
	};
</script>

<style lang="stylus" type="text/stylus" scoped>

</style>