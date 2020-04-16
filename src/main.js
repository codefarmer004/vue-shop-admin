import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/element"
import "../node_modules/element-ui/lib/theme-chalk/index.css"
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入表格树
import TreeTable from "vue-table-with-tree-grid"

import axios from 'axios'
// 配置请求根路径
// 本机地址
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 远程后台地址
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config =>{
  // console.log(config)
  //在登录期间，没拿到token，所以Authorization为null，登陆后就有
  config.headers.Authorization = window.sessionStorage.getItem("token")
  //必须return config
  return config
})
//在挂载之前先配置拦截器
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 组件全局注册 表格树
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
