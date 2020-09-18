<template>
	<div>
		这是 index 组件
		<miNav></miNav>
	</div>
</template>

<script>
	import miNav from '@/components/MiNav';

	export default {
	        name: 'home',
		components: {
	                miNav,
		},
	};
</script>

<style scoped>
	.aa {
		color: red;
	}
</style>