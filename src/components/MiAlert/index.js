import Vue from 'vue';
import miAlert from './miAlert.vue';

// 创建一个MiAlert组件的构造函数 MiAlertConstructor
const MiAlertConstructor = Vue.extend(miAlert);

// 导出
export default (text) => {
        // 动态呢哇创建MiAlert组件，并挂载渲染到document.body中
        const instance = new MiAlertConstructor({ data: {text} }).$mount();
        document.body.appendChild(instance.$el);
};