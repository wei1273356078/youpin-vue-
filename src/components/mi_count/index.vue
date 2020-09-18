<template>
	<div class='decrease-increase'>
		<button @click="$emit('decrease', id)" class='decrease' :disabled='count === 1'>-</button>
		<span class='count' v-text='count'></span>
		<button @click="$emit('increase', id)" class='increase' :disabled='count === maxCount'>+</button>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'miCount',
                props: {
                        id: {
                                type: Number
                        },
                        count: {
                                type: Number,
                                // required: true,
                                validator: function(value) {
                                        return value >= 1;
                                }
                        },
                        maxCount: {
                                type:Number,
                                default: 5
                        }
                },
                methods: {
                },
        };
</script>

<style scoped>
	.decrease-increase {
		display: flex;
		align-items: center;
	}
	.decrease-increase>button.decrease {
		font-size: 24px;
	}
	.decrease-increase>span.count {
		font-size: 12px;
		width: 26px;
		height: 20px;
		margin: 0 6px;
		text-align: center;
		line-height: 20px;
		background-color: #eee;
	}
	.decrease-increase>button.increase {
		font-size: 20px;
	}
</style>