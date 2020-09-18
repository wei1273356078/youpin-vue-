<template>
	<div class="mi-count">
		<button @click="$emit('decrease')" :disabled="count === 1">-</button>
		<span v-text="count"></span>
		<button @click="$emit('increase')" :disabled="count === maxCount">+</button>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'miCount',
	        data() {
                        return {}
	        },
	        props: {
                        count: { type: Number, required: true },
                        maxCount: { type: Number, required: true },
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-count
		display: flex
		span
			width: 30px
			text-align: center
			height: 20px
			line-height: 20px
			font-size: 14px
			background-color: #f4f4f4
			color: #333
		button
			width: 20px
			height: 20px
			color: #333


</style>