import Vue from 'vue';
import VueRouter from 'vue-router';
import views from '../views';
import Cookies from 'js-cookie';

// 向vue体系中注册VueRouter中定义的相关组件
Vue.use(VueRouter);

var router = new VueRouter({
        routes: [
                {
                        path: '/',
                        component: views.Home
                },
                {
                        path: '/category',
                        component: views.Category
                },
                {
                        path: '/list/:cid',
                        component: views.List
                },
                {
                        path: '/cart',
                        component: views.Cart,
                        meta: {
                                requireAuth: true
                        },
                },
                {
                        path: '/detail/:pid',
                        component: views.Detail
                },
                {
                        path: '/login',
                        component: views.Login,
                        redirect: '/login/pwd',
                        children: [
                                {
                                        path: 'pwd',
                                        component: views.LoginPwd
                                },
                                {
                                        path: 'phone',
                                        component: views.LoginPhone
                                }
                        ],
                },
                {
                        path: '/profile',
                        component: views.Profile
                },
                {
                        path: '/taste',
                        component: views.Taste
                },
                {
                        path: '/address',
                        component: views.Address,
                        meta: {
                                requireAuth: true
                        },
                },
                {
                        path: '/order_confirm',
                        component: views.OrderConfirm,
                        meta: {
                                requireAuth: true
                        },
                },
                {
                        path: '/pay',
                        component: views.Pay,
                        meta: {
                                requireAuth: true
                        },
                },
                {
                        path: '/my_order',
                        component: views.MyOrder,
                        meta: {
                                requireAuth: true
                        },
                },
        ],
});


router.beforeEach((to, from, next) => {
        if(to.meta.requireAuth) {
                if(Cookies.get('token')) next();  // 放行
                else next({                                // 跳转登录页面
                        path: '/login',
                        query: {                            // 用于返回上一个页面
                                back: to.path
                        }
                });
        }
        else next();
})


// 导出路由对象
export default router;