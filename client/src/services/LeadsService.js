import Api from '@/services/Api'

export default {
  fetchLeads() {
    return Api().get('leads')
  }
}