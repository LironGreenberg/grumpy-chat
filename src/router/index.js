import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "rooms" */ '../views/Login.vue')
  },
  { path: '/login',
    alias: '/',
    component: () => import(/* webpackChunkName: "rooms" */ '../views/Login.vue')
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import(/* webpackChunkName: "rooms" */ '../views/Rooms.vue')
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import(/* webpackChunkName: "room" */ '../views/Room.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
