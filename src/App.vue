<template>
	<!-- 存放当前组件对应的html模板html代码 -->
	<div id="root">
		<keep-alive include="list">
			<router-view></router-view>
		</keep-alive>

	</div>

</template>

<script type="text/ecmascript-6">
	// 存放当前组件对应的javascript代码
	export default {
	        name: 'App'
	};
</script>

	<style>
	/* 在根组件里最合适放一些整个项目公用的样式，但不是复位样式 */
	html, body { height: 100%; width: 100%; }
	.ellipsis { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
	.hide-scroll::-webkit-scrollbar { display: none; }
	input,button { border: none; outline: none; background-color: transparent; }
	div#root { width: 100%; height: 100%; }
</style>
