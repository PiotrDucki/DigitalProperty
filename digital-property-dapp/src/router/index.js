import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Property from '@/components/Property'
import MyProperties from '@/components/MyProperties'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/property',
      name: 'property',
      component: Property
    },
    {
      path: '/my-properties',
      name: 'my-properties',
      component: MyProperties
    }
  ]
})
