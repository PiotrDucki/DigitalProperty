<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Property</p>
        <b-field grouped type="is-primary">
          <b-input v-model.number="propertyId" placeholder="Property ID" expanded></b-input>
          <p class="control">
            <button class="button is-accent" v-on:click="search()">Search</button>
          </p>
        </b-field>
        <b-field label="Property Data" type="is-primary">
          <b-input disabled v-model="getProperty.data"></b-input>
        </b-field>
        <b-field label="Property Owner" type="is-primary">
          <b-input disabled v-model="getProperty.owner"></b-input>
        </b-field>
      </div>
    </div>
    <div class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Offer</p>
        <b-field label="Price" type="is-primary">
          <b-input disabled v-model="getProperty.offer.price"></b-input>
        </b-field>
        <b-field label="Buyer" type="is-primary">
          <b-input disabled v-model="getProperty.offer.buyer"></b-input>
        </b-field>
        <b-button disabled type="is-accent is-medium has-margin-top-30" expanded>Buy</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Property',
  data: function () {
    return {
      propertyId: null
    }
  },
  methods: {
    ...mapActions(['loadProperty']),
    search () {
      if (this.propertyId === parseInt(this.propertyId, 10)) {
        this.loadProperty(this.propertyId)
      } else {
        this.inputIsNotIntegerAlert()
      }
      console.log(this.propertyId)
    },
    inputIsNotIntegerAlert () {
      this.$buefy.notification.open({
        duration: 5000,
        message: `Property ID must be an integer`,
        type: 'is-danger',
        hasIcon: true
      })
    }
  },
  computed: mapGetters(['getProperty'])
}
</script>

<style scoped>
</style>
