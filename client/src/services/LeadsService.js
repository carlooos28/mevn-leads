import Api from '@/services/Api'

export default {
  fetchLeads () {
    return Api().get('leads')
  },
  addLead (params) {
    return Api().post('add_lead', params)
  },
  updateLead (params) {
    return Api().put('leads/' + params.id, params)
  },
  getLead (params) {
    return Api().get('lead/' + params.id)
  },
  deleteLead (id) {
    return Api().delete('leads/' + id)
  }  
}