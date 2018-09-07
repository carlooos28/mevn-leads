import Vue from 'vue'
import Router from 'vue-router'
import Leads from '@/components/Leads'
import NewLead from '@/components/NewLead' 
import EditLead from '@/components/EditLead'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Leads',
      component: Leads
    },
    {
      path: '/leads',
      name: 'Leads',
      component: Leads
    },
    {
      path: '/leads/new',
      name: 'NewLead',
      component: NewLead
    },
    {
      path: '/leads/:id',
      name: 'EditLead',
      component: EditLead
    }
  ]
})
