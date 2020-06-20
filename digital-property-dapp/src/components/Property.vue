<template>
<div class="tile is-ancestor">
  <div class="tile is-parent has-margin-15">
    <div class="tile is-child box notification has-padding-40">
      <p class="title is-1">Property</p>
      <b-field grouped type="is-primary">
        <b-input v-model.number="propertyId" placeholder="Property ID" expanded type='number'></b-input>
        <p class="control">
          <button class="button is-accent" v-on:click="search()">Search</button>
        </p>
      </b-field>
      <b-field label="Property Data" type="is-primary">
        <b-input disabled v-model="property.data"></b-input>
      </b-field>
      <b-field label="Property Owner" type="is-primary" class="has-padding-bottom-30">
        <b-input disabled v-model="property.owner"></b-input>
      </b-field>
    </div>
  </div>
  <div v-bind:class="[(showOffer) ? 'has-height-400' : 'has-height-150','tile is-parent has-margin-15']">
    <div class='tile is-child box notification has-padding-40'>
      <p class="title is-1">Offer</p>
      <div v-if="showOffer">
        <b-field label="Price" type="is-primary">
          <b-input disabled v-model="property.offer.price"></b-input>
        </b-field>
        <b-field label="Buyer" type="is-primary">
          <b-input disabled v-model="property.offer.buyer"></b-input>
        </b-field>
        <b-button :disabled=userIsNotBuyer type="is-accent is-medium has-margin-top-30 " expanded v-on:click="buyProperty()">Buy</b-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { notifications } from './elements/notifications.js'
import { buyPropertyContracCall } from '@/util/contractAPI'
import { isIdValid } from '@/util/validation'

export default {
  name: 'Property',
  mixins: [notifications],
  data: function () {
    return {
      propertyId: Number(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions(['loadProperty']),
    search () {
      if (isIdValid(this.propertyId)) {
        this.$root.$router.push({ name: 'property', params: { id: this.propertyId } })
        this.loadProperty(this.propertyId)
          .catch(e => this.errorNotification(e.message))
      } else {
        this.errorNotification(`Property ID must be an integer`)
      }
    },
    buyProperty () {
      var offerDetails = {
        propertyId: this.propertyId,
        price: this.property.offer.price
      }
      buyPropertyContracCall(offerDetails)
      this.confirmAcctionInMetaMaskNotification()
    }
  },
  computed: {
    ...mapState({
      property: state => state.property,
      userAddress: state => state.web3.coinbase
    }),
    ...mapGetters(['isUserAdmin']),
    showOffer () {
      return this.property.ifForSale &&
        (this.isUserAdmin ||
          this.property.owner === this.userAddress || this.property.offer.buyer === this.userAddress)
    },
    userIsNotBuyer () {
      return this.property.offer.buyer !== this.userAddress
    }
  },
  watch: {
    $route (to, from) {
      this.propertyId = Number(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
</style>
