<template>
	<div class="page-contanier">
		<div class="page-header">
			<a @click="$router.back()">后退</a>
			<span @click="isEidt = !isEidt" v-text="isEidt ? '完成' : '编辑'"></span>
		</div>
		<div class="page-content">
			<div class="empoty" v-if="list.length === 0"></div>
			<ul v-else>
				<li v-for="item in list" :key="">
					<i class="checkbox" :class="{ checked: item.checked }" @click="item.checked = !item.checked"></i>
					<router-link :to="`/detail/${item.id}`" class="avatar-wrapper"><img :src="item.avatar" alt="" class="avatar"></router-link>
					<div class="p-detail">
						<router-link :to="`/detail/${item.id}`">
							<h4 class="name" v-text="item.name"></h4>
							<p class="brief" v-text="item.brief"></p>
						</router-link>
						<div class="p-detail-footer">
							<div class="price-wrapper">
								￥<span class="price" v-text="item.price"></span>
							</div>
							<MiCount :count="item.count" :max-count="5" @increase="increase(item.id)" @decrease="decrease(item.id)"></MiCount>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="page-footer" v-show="list.length && isEidt">
			<div class="all-checked-wrapper" @click="toggleAll">
				<i class="checkbox" :class="{ checked: isAllChecked }"></i>全选
			</div>
		</div>
		<div class="page-footer" v-show="list.length && !isEidt">编辑状态</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import MiCount from './MiCount.vue';

        export default {
                name: 'cart',
	        components: { MiCount },
	        data() {
                        return {
                                isEidt: false,   // 标识是否进入了编辑状态
	                        list: [],               // 购物车的购物细信息
                        }
	        },
	        computed: {
                        isAllChecked() {
                                return this.list.every(item => item.checked);
                        }
	        },
	        methods: {
                        increase(id) { console.log(id); },
		        decrease(id) { console.log(id); },
			toggleAll() {
			        let flag = this.isAllChecked;
			        this.list.forEach(item => item.checked = !flag)
			}
	        },
	        created() {
                        this.$axios({
                                url: '/cart/list',
                                method: 'post',
                        })
	                        .then(data => {
	                                data.forEach(item => item.checked = true);
                                        this.list = data;
	                        });
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-contanier
		display: flex
		flex-direction: column


</style>