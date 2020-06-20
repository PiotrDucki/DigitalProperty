<template>
<div>
  <admin-users/>
  <admin-properties/>
  <admin-transactions/>
  <admin-recent-activities/>
</div>
</template>

<script>
import AdminUsers from './AdminUsers.vue'
import AdminProperties from './AdminProperties.vue'
import AdminTransactions from './AdminTransactions.vue'
import AdminRecentActivities from './AdminRecentActivities.vue'

import {} from '@/util/contractAPI'

export default {
  name: 'Admin',
  components: {
    AdminUsers,
    AdminProperties,
    AdminTransactions,
    AdminRecentActivities
  }
}
</script>

<style scoped>
</style>
