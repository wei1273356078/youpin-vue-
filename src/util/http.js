import Vue from 'vue';
import router from '../router';
import axios from 'axios';
import Cookies from 'js-cookie';

// 创建一个公用的永远是pending的Promise来应对ajax中所有的错误情况，这样可以让组件代码更加优雅
const alwaysPendingPromise = new Promise(() => {});
// 创建实例axios
const instance = axios.create();

// 设置请求拦截器
instance.interceptors.request.use(
        config => {
                config.headers = {
                        'Content-Type': 'application/json',
                        'Authorization': Cookies.get('token')
                };
                if(config.data) config.data = JSON.stringify(config.data);
                return config;
        },
        error => {
                Vue.prototype.$alert(error.message);
                return alwaysPendingPromise;
        }
);

// 设置响应拦截器
instance.interceptors.response.use(
        response => {
                if(response.status === 200) {
                        let {code, data, msg} = response.data;
                        switch (code) {
                                case 200:
                                        // 如果响应头的authorization中包含最新的token，更新到Cookies的token键中
                                        if(response.headers.authorization) Cookies.set('token', response.headers.authorization);
                                        return data;
                                case 401:
                                        Cookies.remove('token');
                                        router.replace({
                                                path: '/login',
                                                query: {
                                                        back: router.currentRoute.fullPath
                                                }
                                        });
                                case 199:
                                case 404:
                                case 500:
                                        if(msg) Vue.prototype.$alert(msg);
                                        return alwaysPendingPromise;
                        }
                }
        },
        error => {
                Vue.prototype.$alert(error.message);
                // 出错，一直让promise保持挂起状态（为了不写catch）
                return alwaysPendingPromise;
        }
);

// 导出实例axios
export default instance;