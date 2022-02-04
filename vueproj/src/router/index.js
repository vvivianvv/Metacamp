import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    // ../views 로 해두면 ../views/index.vue가 뜸
    redirect: '/home',
    // redirect의 역할은 그냥 주소만 바꿔주는 것!!! 아래 children의 /home과는 달라
    // 아래 children은 index.vue 의 router-view 에 뜨는것!!!!!
    children: [
      {
        path: '/home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/dashboard',
        component: () => import('../views/dashboard')
      },
      {
        path: '/department',
        component: () => import('../views/department')
      },
      {
        path: '/user',
        component: () => import('../views/user')
      },
      {
        path: '/device',
        component: () => import('../views/device')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
