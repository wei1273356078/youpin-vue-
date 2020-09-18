// 统一导入views文件夹中的所有页面级组件，并整合后统一导出，便于使用方 代码更加优雅

import Home from './Home/index.vue';
import Category from './Category/category.vue';
import Detail from './Detail/detail.vue';
import List from './List/list.vue';
import Login from './Login/login.vue';
import Profile from './Profile/profile.vue';
import Taste from './Taste/taste.vue';
import Cart from './Cart/cart.vue';
import LoginPwd from './Login/loginPwd.vue';
import  LoginPhone from './Login/loginPhone.vue';
import  Address from './address/address.vue';
import OrderConfirm from './order_confirm';
import Pay from './pay';
import MyOrder from './my_order';

export default {
        Home,
        Category,
        Detail,
        List,
        Login,
        Profile,
        Taste,
        Cart,
        LoginPhone,
        LoginPwd,
        Address,
        OrderConfirm,
        Pay,
        MyOrder
};