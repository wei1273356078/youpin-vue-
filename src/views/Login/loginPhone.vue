<template>
	<div>
		<input type="text" placeholder="请输入手机号" v-model.trim="phone" />
		<input type="text" placeholder="请输入验证码" v-model.trim="code" />
		<button @click="login">登录</button>
	</div>
</template>

<script type="text/ecmascript-6">

        export default {
                data() {
                        return {
                                phone: '',
	                        code: ''
                        };
                },
	        methods: {
                        login: function(){
                                this.$axios({
                                        method: 'post',
                                        url: '/user/login_phone',
                                        data: {
                                                phone: this.phone,
                                        }
                                })
                                        .then(data => {
                                                this.$cookies.set('token', data);
                                                // todo...
                                                this.$router.replace(this.$route.query.back || '/');
                                        })
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>