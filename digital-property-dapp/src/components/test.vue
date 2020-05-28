<template>
  <div class="container">
    <div class="columns">
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
export default {
  name: 'test',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  }
}
</script>

<style scoped>

</style>
