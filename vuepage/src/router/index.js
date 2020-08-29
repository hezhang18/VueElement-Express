import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Not Found',
    cpmponent: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isToken = sessionStorage.elementToken ? true : false;
  if(to.path == '/login' || to.path == '/register') {
    isToken ? next('/index') : next()
  }else{
    isToken ? next() : next('/login')
  }
})

export default router
