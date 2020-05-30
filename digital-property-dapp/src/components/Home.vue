<template>
  <div class="container">
    <div v-if="web3 != null" class="columns is-4">
      <div class="column .has-padding-10 .has-margin-30">
        <p>Metamask: {{ web3.isInjected }}</p>
      </div>
      <div class="column">
        <p>Network: {{ networkName }}</p>
      </div>
      <div class="column">
        <p>Account: {{ web3.coinbase }}</p>
      </div>
      <div class="column">
        <p>Balance:{{ web3.balance }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  methods: {
  },
  computed: {
    ...mapState({
      web3: state => state.web3
    }),
    ...mapGetters(['networkName'])
  }
}
</script>

<style scoped>

</style>
