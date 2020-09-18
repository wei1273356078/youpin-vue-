<template>
	<div class="mi-cart">
		<!-- cart-empty -->
		<div v-if='proList.length === 0' class="cart-empty">
			<div class="cart-top">
				<i @click="$router.back()" class="iconfont icon-back prev-back"></i>
				<div>购物车</div>
				<i></i>
			</div>
			<div class="cart-content">
				<img src="@/assets/img/no_result_cart.png" />
				<p>购物车还没有商品哦~</p>
				<router-link to="/">去逛逛</router-link>
			</div>
		</div>
		<!-- cart-list-top -->
		<!-- <div class="cart-list-top">
		  <i class="iconfont icon-back prev-back"></i>
		  <h3>购物车</h3>
		  <span>编辑</span>
		</div> -->
		<!-- cart-list -->
		<div v-else v-show='!isEdit && proList.length' class="cart-list">
			<div class="scroll hide-scroll">
				<div class="list-content">
					<div class="list-edit">
						<i @click="$router.back()" class="iconfont icon-back prev-back" ></i>
						<h3>购物车</h3>
						<span @click='edit' class="edit">编辑</span>
					</div>
					<div class="list-info">
						<div v-for='item in proList' :key='item.id' class='product-info'>
							<div class='product-wrapper'>
								<i class='checkbox' :class="{ check: item.check }" @click="item.check = !item.check"></i>
								<div class='list-product'>
									<div class='img-wrap'><img :src='item.avatar' /></div>
									<div class='font-wrap'>
										<h3 v-text='item.name'></h3>
										<div class='price-count'>
											<span class='price' v-text='item.price'></span>
											<!--<mi-count @decrease='decrease' @increase='increase' :id='item.id' :count='item.count' :max-count='20'></mi-count>-->
											<MiCount @decrease='decrease' @increase='increase' :id='item.id' :count='item.count' :max-count='20'></MiCount>
										</div>
									</div>
								</div>
							</div>
							<div class='service'>
								<div><span>服务</span>安装服务|延长保障</div>
								<span>选服务</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="list-bottom">
				<div class="list-all" @click="toggleAllCheck">
					<i class="checkall all" :class="{ check: isAllCheck }"></i>
					<span>全选</span>
				</div>
				<div class="list-account">
					合计：<span v-text='account'></span>
					<button @click='settle' class="btn-settle">结算(<span v-text='total' class="count">0</span>)</button>
				</div>
			</div>
		</div>
		<!-- cart-edit -->
		<div v-show='isEdit && proList.length' class="cart-edit">
			<div class="scroll hide-scroll">
				<div class="list-content">
					<div class="list-edit">
						<i class="iconfont icon-back prev-back" @click='isEdit = false'></i>
						<h3>购物车</h3>
						<span class="edit" @click="edit">完成</span>
					</div>
					<div class="edit-info">
						<div v-for='item in proList' class='product-info'>
							<div class='product-wrapper'>
								<i class='checkedit' :class="{ check: item.check1 }" @click="item.check1 = !item.check1"></i>
								<div class='list-product'>
									<div class='img-wrap'><img :src='item.avatar' /></div>
									<div class='font-wrap'>
										<h3 v-text='item.name'></h3>
										<div class='price-count'>
											<span class='price' v-text='item.price'></span>
											<!--<mi-count @decrease='decrease' @increase='increase' :id='item.id' :count='item.count' :max-count='20'></mi-count>-->
											<MiCount @decrease='decrease' @increase='increase' :id='item.id' :count='item.count' :max-count='20'></MiCount>
										</div>
									</div>
								</div>
							</div>
							<div class='service'>
								<div><span>服务</span>安装服务|延长保障</div>
								<span>选服务</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="list-bottom">
				<div class="edit-all" @click="toggleAllCheck1">
					<i class="checkall-edit all" :class="{ check: isAllCheck1 }"></i>
					<span>全选</span>
				</div>
				<button class="btn-delete" @click="deleteChecked">删除</button>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import MiCount from '../../components/mi_count/index.vue';

	export default {
	        name: 'cart',
		components: {
	                MiCount
		},
                data () {
                        return {
                                isEdit: false, // 是否进入编辑
                                proList: [], // 请求的数据
                        }
                },
                methods: {
                        increase: function(id) {
                                this.$axios({
                                        url: '/cart/increase/' + id,
                                        method: 'post',
                                })
                                        .then(response => {
                                                var index = this.proList.findIndex(item => id === item.id);
                                                this.proList[index].count = this.proList[index].count + 1;
                                        })
                        },
                        decrease: function(id) {

                                this.$axios({
                                        url: '/cart/decrease/' + id,
                                        method: 'post',
                                })
                                        .then(response => {
                                                var index = this.proList.findIndex(item => id === item.id);
                                                this.proList[index].count = this.proList[index].count - 1;
                                        })
                        },
                        edit () {
                                this.isEdit = !this.isEdit;
                        },
                        settle() {
                                let ids = [];
                                this.proList.forEach(item => {
                                        if(item.check) {
                                                ids.push(item.id);
                                        }
                                });
                                ids = ids.join(',');
                                this.$cookies.set('ids', ids);
                                if(ids.length === 0) return this.$alert('请选择购买的商品');
                                this.$router.push('/order_confirm');
                        },
                        toggleAllCheck: function(){
                                let flag = this.isAllCheck;
                                this.proList.forEach(item => item.check = !flag);
                        },
                        toggleAllCheck1: function(){
                                let flag = this.isAllCheck1;
                                this.proList.forEach(item => item.check1 = !flag);
                        },
                        deleteChecked() {
                                let ids = [];
                                // 删除选中的
                                this.proList.forEach(item => {
                                        if(item.check1) {
                                                ids.push(item.id);
                                        }
                                });
                                if(ids.length === 0) return this.$alert('请选择需要删除的商品');
                                this.$axios({
                                        method: "post",
                                        url: "/cart/remove",
                                        data: { ids }
                                })
                                        .then(data => {
                                                ids.forEach(item => {
                                                        let i = this.proList.findIndex(item2 => item2.id === item.id );
                                                        this.proList.splice(i,1);
                                                });
                                                this.$alert('删除成功');
                                        });
                        },
                },
                computed: {
                        total: function() {
                                var total = 0;
                                this.proList.forEach(item => {
                                        if(item.check) {
                                                total += item.count
                                        }
                                });
                                return total;
                        },
                        account: function() {
                                var account = 0;
                                this.proList.forEach(item => {
                                        if(item.check) {
                                                account += item.price * item.count
                                        }
                                } );
                                return account;
                        },
	                isAllCheck: function(){
		                return this.proList.every(item => item.check);
                        },
                        isAllCheck1: function(){
                                return this.proList.every(item => item.check1);
                        },
                },
                created () {
                        this.$axios({
                                url: '/cart/list',
                                method: 'post',
                        })
                                .then(data => {
                                        data.forEach(item => item.check = true);
                                        data.forEach(item => item.check1 = false);
                                        this.proList = JSON.parse(JSON.stringify(data));
                                })
                }
	};
</script>

<style scoped>
	/* cart-container */
	.mi-cart {
		height: 100%;
		width: 100%;
	}
	/* cart-empty */
	.mi-cart .cart-empty {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.mi-cart .cart-empty>.cart-top {
		flex-shrink: 0;
		height: 88px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url('/images/cart/bg_page_header.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.mi-cart .cart-empty>.cart-top>i {
		width: 42px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		font-size: 24px;
		flex-shrink: 0;
		color: #fff;
	}
	.mi-cart .cart-empty>.cart-top>div {
		width: 100%;
		font-size: 20px;
		font-weight: 600;
		flex-grow: 1;
		text-align: center;
		color: #fff;
	}
	.mi-cart .cart-empty>.cart-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgb(244, 244, 244);
	}
	.mi-cart .cart-empty>.cart-content>img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.mi-cart .cart-empty>.cart-content>p {
		font-size: 14px;
		margin: 20px 0;
		color: #666;
	}
	.mi-cart .cart-empty>.cart-content>a {
		font-size: 15px;
		padding: 9px 15px;
		border: 1px solid rgb(102, 102, 102);
		border-radius: 24px;
		color: #666;
		background-color: #fff;
	}


	/* cart-list-top */
	.mi-cart .cart-list-top {
		opacity: 1;
		transition: all 0.4s;
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		display: flex;
		flex-basis: 0;
		justify-content: space-between;
		align-items: center;
		height: 45px;
		border-bottom: 1px solid rgb(191, 191, 192);
		background-color: #fff;
	}
	.mi-cart .cart-list-top>i {
		font-size: 24px;
		width: 40px;
		height: 45px;
		line-height: 45px;
		text-align: center;
	}
	.mi-cart .cart-list-top>h3 {
		font-size: 16px;
		font-weight: 400;
		color: #333;
	}
	.mi-cart .cart-list-top>span {
		padding-right: 20px;
		font-size: 12px;
		color: #333;
	}


	/* cart-list */
	.mi-cart .cart-list {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.mi-cart .cart-list>.scroll {
		overflow: auto;
		flex-grow: 1;
		background-color: rgb(240, 240, 240);
	}

	/* list-content */
	.mi-cart .cart-list>.scroll>.list-content {
		display: flex;
		flex-direction: column;
		background-image: url('/images/cart/bg_page_header.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.mi-cart .cart-list>.scroll>.list-content>.list-edit {
		height: 88px;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mi-cart .cart-list>.scroll>.list-content>.list-edit>i {
		width: 42px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		font-size: 24px;
		flex-shrink: 0;
		color: #fff;
	}
	.mi-cart .cart-list>.scroll>.list-content>.list-edit>h3 {
		font-size: 20px;
		flex-grow: 1;
		text-align: center;
		color: #fff;
	}
	.mi-cart .cart-list>.scroll>.list-content>.list-edit>span.edit {
		font-size: 14px;
		padding-right: 20px;
		flex-shrink: 0;
		color: #fff;
	}
	/* product-info */
	.mi-cart .product-info {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		margin: 0 10px 10px;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 10px;
		background-color: #fff;
	}
	/* .product-wrapper */
	.mi-cart .product-info>.product-wrapper {
		display: flex;
		align-items: center;
	}
	.mi-cart .product-info>.product-wrapper>i.checkbox {
		height: 18px;
		width: 18px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url('/images/cart/icon_checkbox_uncheck_darkgray.png');
	}
	.mi-cart .product-info>.product-wrapper>i.checkbox.check {
		background-image: url('/images/cart/icon_checkbox_check_red.png');
	}
	.mi-cart .product-info>.product-wrapper>.list-product {
		display: flex;
		flex-grow: 1;
		margin-left: 10px;
	}
	.mi-cart .product-info>.product-wrapper>.list-product>.img-wrap {
		border-radius: 10px;
		width: 86px;
		height: 86px;
		background-color: rgb(248, 248, 248);
	}
	.mi-cart .product-info>.product-wrapper>.list-product>.img-wrap>img {
		width: 100%;
	}
	.mi-cart .product-info>.product-wrapper>.list-product>.font-wrap {
		 display: flex;
		 flex-direction: column;
		 flex-grow: 1;
		 margin-left: 10px;
	 }
	.mi-cart .product-info>.product-wrapper>.list-product>.font-wrap>h3 {
		font-size: 14px;
		margin-top: 5px;
		font-weight: 400;
		color: #333;
	}
	.mi-cart .product-info>.product-wrapper>.list-product>.font-wrap>.price-count {
		margin: 10px 5px 10px 0;
		display: flex;
		justify-content: space-between;
	}
	.mi-cart .product-info>.product-wrapper>.list-product>.font-wrap>.price-count>span.price {
		font-size: 15px;
		color: rgb(191, 17, 17);
	}

	/* service */
	.mi-cart .product-info>.service {
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		padding: 10px 0 5px;
	}
	.mi-cart .product-info>.service>div {
		color: #666;
	}
	.mi-cart .product-info>.service>div>span {
		margin-right: 10px;
		margin-left: 30px;
		color: rgb(187, 158, 114);
	}
	.mi-cart .product-info>.service>span {
		color: #333;
	}



	/* list-bottom */
	.mi-cart .cart-list>.list-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 10px;
		height: 54px;
		flex-shrink: 0;
		border-top: 1px solid #999;
	}
	.mi-cart .cart-list>.list-bottom>.list-all {
		display: flex;
		align-items: center;
	}
	.mi-cart .cart-list>.list-bottom>.list-all>i.checkall {
		height: 18px;
		width: 18px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url('/images/cart/icon_checkbox_uncheck_darkgray.png');
	}
	.mi-cart .cart-list>.list-bottom>.list-all>i.checkall.check {
		background-image: url('/images/cart/icon_checkbox_check_red.png');
	}
	.mi-cart .cart-list>.list-bottom>.list-all>span {
		padding-left: 10px;
		font-size: 13px;
	}
	.mi-cart .cart-list>.list-bottom>.list-account {
		font-size: 13px;
		color: #000;
	}
	.mi-cart .cart-list>.list-bottom>.list-account>span {
		font-size: 16px;
		color: rgb(191, 17, 17);
	}
	.mi-cart .cart-list>.list-bottom>.list-account>button.btn-settle {
		width: 96px;
		height: 38px;
		border-radius: 19px;
		font-size: 15px;
		color: #fff;
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
	}
	.mi-cart .cart-list>.list-bottom>.list-account>button.btn-settle>span.count {}



	/* cart-edit */
	.mi-cart .cart-edit {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
	.mi-cart .cart-edit>.scroll {
		display: flex;
		flex-grow: 1;
		overflow: auto;
	}
	/* list-content */
	.mi-cart .cart-edit>.scroll>.list-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		background-image: url('/images/cart/bg_page_header.png');
		background-repeat: no-repeat;
		background-size: 100%;
		background-color: rgb(240, 240, 240);
	}
	.mi-cart .cart-edit>.scroll>.list-content>.list-edit {
		height: 88px;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mi-cart .cart-edit>.scroll>.list-content>.list-edit>i {
		width: 42px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		font-size: 24px;
		flex-shrink: 0;
		color: #fff;
	}
	.mi-cart .product-info>.product-wrapper>i.checkedit {
		height: 18px;
		width: 18px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url('../../assets/img/icon_checkbox_uncheck_darkgray.png');
	}
	.mi-cart .product-info>.product-wrapper>i.checkedit.check {
		background-image: url('../../assets/img/icon_checkbox_check_red.png');
	}
	.mi-cart .cart-edit>.scroll>.list-content>.list-edit>h3 {
		font-size: 20px;
		flex-grow: 1;
		text-align: center;
		color: #fff;
	}
	.mi-cart .cart-edit>.scroll>.list-content>.list-edit>span.edit {
		font-size: 14px;
		padding-right: 20px;
		flex-shrink: 0;
		color: #fff;
	}
	/* list-bottom */
	.mi-cart .cart-edit>.list-bottom {
		border-top: 1px solid #999;
		flex-shrink: 0;
		height: 53px;
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		align-items: center;
	}
	.mi-cart .cart-edit>.list-bottom>.edit-all {
		display: flex;
		align-items: center;
	}
	.mi-cart .cart-edit>.list-bottom>.edit-all>i.checkall-edit {
		height: 18px;
		width: 18px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url('/images/cart/icon_checkbox_uncheck_darkgray.png');
	}
	.mi-cart .cart-edit>.list-bottom>.edit-all>i.checkall-edit.check {
		background-image: url('/images/cart/icon_checkbox_check_red.png');
	}
	.mi-cart .cart-edit>.list-bottom>.edit-all>span {
		font-size: 13px;
		color: #333;
		padding-left: 10px;
	}
	.mi-cart .cart-edit>.list-bottom>button.btn-delete {
		font-size: 15px;
		width: 96px;
		height: 38px;
		line-height: 38px;
		border-radius: 19px;
		text-align: center;
		color: #fff;
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
	}


</style>