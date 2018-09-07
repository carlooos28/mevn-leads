<template>
  <div class="leads">
    <h1>Leads</h1>
    This file will list all the leads.

    <div v-for="lead in leads">
      <p>
        <span><b>{{ lead.title }}</b></span><br />
        <span>{{ lead.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import LeadsService from '@/services/LeadsService'
export default {
  name: 'leads',
  data () {
    return {
      leads: []
    }
  },
  mounted () {
    this.getLeads()
  },
  methods: {
    async getLeads () {
      const response = await LeadsService.fetchLeads()
      this.leads = response.data
    }
  }
}
</script>