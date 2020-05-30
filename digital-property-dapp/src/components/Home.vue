<template>
  <div class="container">
    <div v-if="web3 != null" class="columns">
      <div class="column">
        <p>Hello</p>
      </div>
      <div class="column">
        <p>Metamask: {{ web3.isInjected }}</p>
      </div>
      <div class="column">
        <p>Network: {{ web3.networkId }}</p>
      </div>
      <div class="column">
        <p>Account: {{ web3.coinbase }}</p>
      </div>
      <div class="column">
        <p>Balance: {{ web3.balance }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions(['registerWeb3'])
  },
  computed: mapState({
    web3: state => state.web3
  }),
  created () {
    this.registerWeb3()
  }
}
</script>

<style scoped>

</style>
