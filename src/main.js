// ES6导入vue
import Vue from 'vue';
import Cookies from 'js-cookie';
import http from './util/http.js';
import router from './router'; // 导入路由对象
import './assets/reset.css';  // 引入复位样式
import App from './App.vue';  // 导入自定义组件
import miAlert from './components/MiAlert';


// 自定义扩展Vue组件的原型对象Vue.prototype
Vue.prototype.$axios = http;
Vue.prototype.$cookies = Cookies;
Vue.prototype.$alert = miAlert;

// new一个vue根实例
new Vue({
        el: '#app',
        // 注册自定义子组件
        components: {
                App,
        },
        // 使用自定义组件
        template: '<App></App>',
        router
});


