import axios from 'axios'
import Vue from 'vue'
// 导入表格树
import TreeTable from "vue-table-with-tree-grid"
import "../node_modules/element-ui/lib/theme-chalk/index.css"
import App from './App.vue'
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import "./plugins/element"
import router from './router'
import store from './store'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 配置请求根路径
// 本机地址
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 远程后台地址
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
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

//将富文本编辑器，注册为全局可用组件
Vue.use(VueQuillEditor)

Vue.filter("dataFormat", function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + "").padStart(2, "0")
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
