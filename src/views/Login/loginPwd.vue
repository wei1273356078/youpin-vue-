<template>
	<div class="pwd">
		<input type="text" placeholder="请输入用户名" v-model.trim="name" />
		<input type="password" placeholder="请输入密码" v-model.trim="pwd" />
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
                                                this.$cookies.set('userName', this.name);
                                                // todo...
                                                this.$router.replace(this.$route.query.back || '/');
					})
                        }
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.pwd
		display: flex
		flex-direction: column
		align-items: center
		input
			border: none
			outline: none
			font-size: 14px
			height: 55px
			width: 320px
		input[type=text]
			text-indent: 1em
			border-bottom: 1px solid #D1A96E
		input[type=password]
			text-indent: 1em
			border-bottom: 1px solid #D1A96E
		button
			margin: 15px 0
			width: 320px
			height: 45px
			border-radius: 27.5px
			font-size: 18px
			color: #fff
			background: linear-gradient(to right, #E4BB7E, #D1A96E )
</style>