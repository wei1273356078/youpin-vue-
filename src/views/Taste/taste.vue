<template>
	<div>
		这是 taske 组件
		<miNav :total="total"></miNav>
	</div>
</template>

<script>
	import miNav from '../../components/MiNav';

	export default {
	        name: 'taske',
		components: {
	                miNav
		},
		data() {
	                return {
	                        total: 0
	                }
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
		}
	};
</script>

<style scoped>

</style>