import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 安装element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import toast from '@/components/common/toast'
// 安装toast插件
Vue.use(toast)
    // 事件总线
Vue.prototype.$bus = new Vue()

import http from './http'
Vue.prototype.$http = http

// // 网络请求
// import axios from 'axios'

// Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')