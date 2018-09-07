<template>
  <div class="leads">
    <h1>Leads</h1>
    <div v-if="leads.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewLead' }" class="">Add Lead</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="lead in leads">
          <td>{{ lead.title }}</td>
          <td>{{ lead.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditLead', params: { id: lead._id } }">Edit</router-link> |
            <a href="#" @click="deleteLead(lead._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no leads.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewLead' }" class="add_lead_link">Add Lead</router-link>
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
      this.leads = response.data.leads
    },
    async deleteLead (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        LeadsService.deleteLead(id)
        $this.$router.go({
          path: '/leads'
        })
      })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>