import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login"
import Home from "../components/Home"
import Welcome from "../components/Welcome"
import Users from '../components/user/User'
import Rights from "../components/power/Rights"
import Roles from "../components/power/Roles"
import Cate from "../components/gooods/Cate"
import GoodsList from "../components/gooods/List"
import Params from "../components/gooods/Params"


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome
      },
      {
        path: "/users",
        component: Users
      },
      {
        path: "/rights",
        component: Rights
      },
      {
        path: "/roles",
        component: Roles
      },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
    ]
  },
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === "/login") return next();
  // 没有token, 强制跳转到登录页
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next("/login");
  next();

})
export default router
