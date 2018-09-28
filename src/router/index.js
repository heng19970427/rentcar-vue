import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from '@/components/pages/index'
import Login from '@/components/pages/login'
import CreateOrder from '@/components/pages/order/create'
import Home from '@/components/pages/home/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      beforeEnter: (to, from, next) => {
        if (!store.getters.signed) {
          next('/login')
        } else {
          next()
        }
      },
      children: [
        {
          path: '', component: Home, name: '首页'
        }, {
          path: '/order/create', component: CreateOrder, name: '订单创建'
        }
      ]
    }
  ]
})
