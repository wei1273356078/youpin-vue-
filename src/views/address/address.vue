<template>
	<div class="mi-address">
		<!-- address-container -->
		<div v-show='addressInfos.isShow === 0' class="address-container">
			<!-- page-header -->
			<div class="page-header">
				<i class="iconfont icon-back prev-back" @click="$router.back()"></i>
				<span>收货地址</span>
				<i></i>
			</div>
			<!-- empty -->
			<div v-if='addressInfos.addressInfo.length === 0' class="page-empty">
				<img src="../../assets/img/no_result_address.png" />
				<p>你还没有收货地地址，请点击下方+新建</p>
			</div>
			<!-- page-content -->
			<div v-else class="page-content hide-scroll">
				<div
					v-for='info in addressInfos.addressInfo'
					:key='info.id'
					@click='update(info.id)'
					class='address-list'
				>
					<div class='address-info'>
						<div>
							<span class='name' v-text='info.receiveName'></span>
							<span class='phone' v-text='info.receivePhone'></span>
						</div>
						<p class='ellipsis'>
							<span v-if='info.isDefault === 1'>默认</span>
							<p v-text='`${info.receiveRegion} ${info.receiveDetail}`'></p>
						</p>
					</div>
					<img src='../../assets/img/icon_edit_gray.png' />
				</div>
			</div>
			<!-- page-footer -->
			<div class="page-footer">
				<button @click='addAddress' class="add-address">+ 添加地址</button>
			</div>
		</div>

		<!-- edit-info -->
		<div v-show='addressInfos.isShow === 1 || addressInfos.isShow === 2' class="edit-address-info">
			<!-- page-header -->
			<div class="page-header">
				<i @click='backPrev' class="iconfont icon-back address-back"></i>
				<span v-show='addressInfos.isShow === 1'>新增地址</span>
				<span v-show='addressInfos.isShow === 2'>编辑地址</span>
				<i></i>
			</div>
			<!-- add-info -->
			<div class="add-info">
				<div class="receive-info">
					<div>
						<span>收货人姓名</span>
						<input v-model='addressInfos.address.receiveName' type="text" class="name" placeholder="请输入姓名" />
					</div>
					<div>
						<span>手机号码</span>
						<input v-model='addressInfos.address.receivePhone' type="text" class="phone" placeholder="请输入手机号码" />
					</div>
					<div>
						<span>所在地区</span>
						<input v-model='addressInfos.address.receiveRegion' type="text" class="regions-picker region" placeholder="请选择所在地区" />
					</div>
					<div>
						<span>街道地址</span>
						<input v-model='addressInfos.address.receiveDetail' type="text" class="detail" placeholder="请输入街道地址" />
					</div>
				</div>
				<div v-show='addressInfos.isShow === 2' class="default-info">
					<i v-show='addressInfos.address.isDefault === 1' @click="addressInfos.address.isDefault = 0" class="checkbox check"></i>
					<i v-show='addressInfos.address.isDefault === 0' @click="addressInfos.address.isDefault = 1" class="checkbox"></i>
					<span class="default">设置默认地址</span>
				</div>
				<div v-show='addressInfos.isShow === 2' @click='remove' class="delete">删除收货地址</div>
				<button @click='save' class="save">保存</button>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'miAddress',
                data() {
                        return {
                                addressInfos: {
                                        addressInfo: [], // 地址信息
                                        isShow: 0,       // 标识： 0收货、1新增、2编辑
                                        address: {
                                                id: 0,
                                                name: '',
                                                isDefault: 0,
                                                receiveName: '',
                                                receivePhone: '',
                                                receiveRegion: '',
                                                receiveDetail: ''
                                        },
                                },
                        }
                },
                methods: {
                        addAddress() {
                                this.addressInfos.isShow = 1;
                        },
                        update(id) {
                                // 跳转order
                                if(this.$cookies.get('orderAddress')) {
                                        var orderAddress = this.$cookies.get('orderAddress');
                                        this.$cookies.remove('orderAddress');
                                        this.$cookies.set('addressId', id);
					this.$router.push(orderAddress);
					return;
                                }
	                        // 修改地址
                                this.addressInfos.isShow = 2;
                                var address = this.addressInfos.addressInfo.find(item => item.id === id)
                                this.addressInfos.address = JSON.parse(JSON.stringify(address));
                                // 如果是默认，则不能点默认按钮
				if(address.isDefault === 0) {}
                        },
                        remove () {
                                this.addressInfos.isShow = 0;
                                var id = this.addressInfos.address.id;
                                var index = this.addressInfos.addressInfo.findIndex(item => item.id === id);
                                this.addressInfos.addressInfo.splice(index, 1);
                                this.$axios({
                                        method: 'get',
                                        url: '/address/remove/' + id,
                                })
                                        .then(response => {
                                                this.$alert('删除成功');
                                                this.addressInfos.address.receiveName = '';
                                                this.addressInfos.address.receivePhone = '';
                                                this.addressInfos.address.receiveRegion = '';
                                                this.addressInfos.address.receiveDetail = '';
                                        })
                        },
                        save() {
                                if(this.addressInfos.isShow === 1) {
                                        this.addressInfos.isShow = 0;
                                        this.addressInfos.address.name = this.$cookies.get('userName');
                                        this.addressInfos.address.id = this.addressInfos.addressInfo[this.addressInfos.addressInfo.length - 1].id + 1;
                                        this.addressInfos.addressInfo.push(JSON.parse(JSON.stringify(this.addressInfos.address)));
                                        this.$axios({
                                                url: '/address/add',
                                                method: 'post',
                                                data: {
                                                        receiveName: this.addressInfos.address.receiveName,
                                                        receivePhone: this.addressInfos.address.receivePhone,
                                                        receiveRegion: this.addressInfos.address.receiveRegion,
                                                        receiveDetail: this.addressInfos.address.receiveDetail,
                                                },
                                        })
                                                .then(response => {
                                                        this.$alert('添加成功');
                                                        // 清空
                                                        this.addressInfos.address.receiveName = '';
                                                        this.addressInfos.address.receivePhone = '';
                                                        this.addressInfos.address.receiveRegion = '';
                                                        this.addressInfos.address.receiveDetail = '';
                                                })
                                }
                                if(this.addressInfos.isShow === 2) {
                                        this.addressInfos.isShow = 0;
                                        var i = this.addressInfos.addressInfo.findIndex(item => item.id === this.addressInfos.address.id);
                                        this.addressInfos.addressInfo[i] = JSON.parse(JSON.stringify(this.addressInfos.address));
                                        var id = this.addressInfos.addressInfo[i].id;
                                        if(this.addressInfos.addressInfo[i].isDefault === 1) {
                                                this.addressInfos.addressInfo.forEach(item => item.isDefault = 0);
                                                this.addressInfos.addressInfo[i].isDefault = 1;
                                                this.$axios({
	                                                method: 'get',
	                                                url: '/address/set_default/' + id,
                                                })
	                                                .then(response => {
                                                                console.log(123);
	                                                })
                                        };
                                        this.$axios({
                                                url: '/address/update',
                                                method: 'post',
                                                data: {
                                                        id: this.addressInfos.address.id,
                                                        receiveName: this.addressInfos.address.receiveName,
                                                        receivePhone: this.addressInfos.address.receivePhone,
                                                        receiveRegion: this.addressInfos.address.receiveRegion,
                                                        receiveDetail: this.addressInfos.address.receiveDetail
                                                }
                                        })
                                                .then(response => {
                                                        this.addressInfos.address.receiveName = '';
                                                        this.addressInfos.address.receivePhone = '';
                                                        this.addressInfos.address.receiveRegion = '';
                                                        this.addressInfos.address.receiveDetail = '';
                                                        this.$alert('修改成功');
                                                })
                                }
                        },
                        backPrev() {
                                this.addressInfos.isShow = 0;
                                this.addressInfos.address.receiveName = '';
                                this.addressInfos.address.receivePhone = '';
                                this.addressInfos.address.receiveRegion = '';
                                this.addressInfos.address.receiveDetail = '';
                        }
                },
                created () {
                        this.$axios({
                                url: '/address/list',
                                method: 'get',
                        })
                                .then(data => {
                                        this.addressInfos.addressInfo = data;
                                })
                }
        };
</script>

<style scoped>
	.mi-address {
		height: 100%;
		width: 100%;
	}
	/* address-container */
	.mi-address .address-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	/* page-header */
	.mi-address .page-header {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid rgb(191, 191, 192);
	}
	.mi-address .page-header>i {
		width: 45px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 24px;
	}
	.mi-address .page-header>span {
		font-size: 16px;
		color: #333;
	}

	/* empty */
	.mi-address .page-empty {
		flex-grow: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgb(243, 243, 243);
	}
	.mi-address .page-empty>img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.mi-address .page-empty>p {
		margin-top: 10px;
		font-size: 13px;
		color: #333;
	}


	/* page-content */
	.mi-address .page-content {
		display: block;
		flex-grow: 1;
		overflow: auto;
	}
	.mi-address .page-content>.address-list {
		height: 100px;
		padding: 0 20px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgb(229, 229, 229);
	}
	.mi-address .page-content>.address-list>img {
		flex-shrink: 0;
		margin-left: 10px;
		width: 17px;
		height: 17px;
	}
	.mi-address .page-content>.address-list>.address-info {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 347px;
	}
	.mi-address .page-content>.address-list>.address-info>div {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		color: #333;
	}
	.mi-address .page-content>.address-list>.address-info>p {
		width: 100%;
		margin-top: 10px;
		font-size: 12px;
		color: #666;
	}
	.mi-address .page-content>.address-list>.address-info>p>span {
		font-size: 12px;
		padding: 2px 4px;
		border: 1px solid rgb(182, 9, 9);
		color: rgb(182, 9, 9);
	}



	/* page-footer */
	.mi-address .page-footer {
		height: 74px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mi-address .page-footer>button.add-address {
		font-size: 14px;
		height: 44px;
		width: 384px;
		outline: none;
		border: 1px solid rgb(132, 95, 63);
		border-radius: 5px;
		color: rgb(132, 95, 63);
		background-color: #fff;
	}


	/* add-address */
	.mi-address .edit-address-info {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.mi-address .edit-address-info>.page-header {
		height: 45px;
		flex-shrink: 0;
	}
	.mi-address .edit-address-info>.add-info {
		flex-grow: 1;
		text-align: center;
		background-color: rgb(246, 246, 246);
	}
	/* receive-info */
	.mi-address .edit-address-info>.add-info>.receive-info {
		display: flex;
		flex-direction: column;
	}
	.mi-address .edit-address-info>.add-info>.receive-info>div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 52px;
		border-bottom: 1px solid #e2e2e2;
		background-color: #fff;
	}
	.mi-address .edit-address-info>.add-info>.receive-info>div>span {
		font-size: 13px;
		color: #333;
	}
	.mi-address .edit-address-info>.add-info>.receive-info>div>input {
		font-size: 14px;
		width: 294px;
		text-indent: 1em;
		color: #333;
	}
	.mi-address .edit-address-info>.add-info>.receive-info>div>input::placeholder {
		color: #ccc;
	}
	/* default-info */

	.mi-address .edit-address-info>.add-info>.default-info {
		display: flex;
		align-items: center;
		margin-top: 7px;
		height: 45px;
		padding-left: 30px;
		background-color: #fff;
	}
	.mi-address .edit-address-info>.add-info>.default-info>i.checkbox {
		width: 18px;
		height: 18px;
		background-image: url('../../assets/img/icon_checkbox_uncheck_darkgray.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.mi-address .edit-address-info>.add-info>.default-info>i.checkbox.check {
		background-image: url('../../assets/img/icon_checkbox_check_red.png');
	}
	.mi-address .edit-address-info>.add-info>.default-info>span.default {
		font-size: 13px;
		padding-left: 5px;
	}
	.mi-address .edit-address-info>.add-info>button.save {
		margin-top: 20px;
		width: 80px;
		height: 36px;
		border-radius: 5px;
		color: #fff;
		background-color: rgb(131, 94, 63);
	}

	.mi-address .edit-address-info>.add-info>.delete {
		display: block;
		text-align: left;
		margin-top: 7px;
		height: 52px;
		line-height: 52px;
		padding-left: 30px;
		font-size: 13px;
		color: rgb(227, 13, 13);
		background-color: #fff;
	}
</style>