<template>
  <form action="">
    <div class="modal-card" style="width: 100">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Offer</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Price">
          <b-input v-model="price" placeholder="10000" required>
          </b-input>
        </b-field>
        <b-field label="Address">
          <b-input v-model="buyerAddres" placeholder="0x95cEC548ddA3d2382e97e2061B8402AC04f9db05" required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button has-width-300" type="button" expanded @click="$parent.close()" >Cancel</button>
        <button class="button has-width-300 is-accent" expanded  @click="createOfferOfferShowNotification(), $parent.close()">Create</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { createOfferContracCall } from '@/util/contractAPI'

export default {
  name: 'CreateOfferModal',
  props: ['propertyId'],
  data: function () {
    return {
      price: null,
      buyerAddres: null
    }
  },
  methods: {
    createOfferOfferShowNotification () {
      var offer = {
        propertyId: this.propertyId,
        price: this.price,
        buyerAddress: this.buyerAddres
      }
      createOfferContracCall(offer)
      this.$buefy.toast.open('User confirmed')
      this.price = null
      this.buyerAddres = null
    }
  }
}
</script>

<style scoped>
</style>
