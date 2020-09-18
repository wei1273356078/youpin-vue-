<template>
	<div>
		<input type="text" placeholder="请输入用户名" v-model.trim="name" />
		<input type="text" placeholder="请输入密码" v-model.trim="pwd" />
		<button @click="login">登录</button>
	</div>
</template>

<script type="text/ecmascript-6">

        export default {
                name: 'loginPwd',
	        data() {
                        return {
                                name: '',
				pwd: ''
                        }
	        },
	        methods: {
                        login: function(){
				this.$axios({
					method: 'post',
					url: '/user/login_pwd',
					data: {
						name: this.name,
						pwd: this.pwd
					}
				})
					.then(data => {
                                                this.$cookies.set('token', data);
                                                // todo...
                                                this.$router.replace(this.$route.query.back || '/');
					})
                        }
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>