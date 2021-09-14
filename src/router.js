import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

 const routes= [
    {
      path: '/login',
      // alias: "/",
      name: 'login',
      component: loadView('Login'),
      meta: { title: 'Login', lang: 'mr', icon : 'mdi mdi-account' }
    },
    {
      path: '/registration',
      name: 'registration',
      component: loadView('Registration'),
      meta: { title: 'Registration', lang: 'mr', icon : 'mdi mdi-account-edit'}
    },
    {
      path: "/admin",
      name: "admin",
      component: loadView("Admin"),
      meta: { title: 'Admin', lang: 'mr', icon : 'mdi mdi-account-edit', requiresAuth:true}
    }
  ]
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {      
      if (!sessionStorage.getItem('user-token')) {
        next({
          name:'login'
        });
      } else {       
        next();
      }
    } else {
      next();
    }
  });
export default router