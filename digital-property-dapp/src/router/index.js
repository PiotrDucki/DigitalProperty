import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Property from '@/components/Property'
import MyProperties from '@/components/MyProperties'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/property/:id',
      name: 'property',
      component: Property
    },
    {
      path: '/my-properties',
      name: 'my-properties',
      component: MyProperties
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
