<template>
<div>
  <admin-users/>
  <admin-properties/>
  <admin-transactions/>
</div>
</template>

<script>
import AdminUsers from './AdminUsers.vue'
import AdminProperties from './AdminProperties.vue'
import AdminTransactions from './AdminTransactions.vue'

import {} from '@/util/contractAPI'

export default {
  name: 'Admin',
  components: {
    AdminUsers,
    AdminProperties,
    AdminTransactions
  }
}
</script>

<style scoped>
</style>
