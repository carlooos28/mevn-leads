import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld' 
import Leads from '@/components/Leads'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/leads',
      name: 'Leads',
      component: Leads
    }
  ]
})
