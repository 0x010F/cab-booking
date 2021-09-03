import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
  routes: [
    {
      path: '/login',
      alias: "/",
      name: 'login',
      component: loadView('Login'),
      meta: { title: 'Login', lang: 'mr', icon : 'mdi mdi-account' }
    },
    {
      path: '/registration',
      name: 'registration',
      component: loadView('Registration'),
      meta: { title: 'Registration', lang: 'mr', icon : 'mdi mdi-account-edit' }
    },
    {
      path: "/admin",
      name: "admin",
      component: loadView("Admin")
    }
  ]
})
