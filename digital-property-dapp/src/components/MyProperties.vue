<template>
<div>

  <div class="tile is-ancestor" v-for="property in myProperties" :key="property.id">
    <div class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Property</p>
        <b-field label="Property Id" type="is-primary">
          <b-input disabled v-model="property.id"></b-input>
        </b-field>
        <b-field label="Property Data" type="is-primary">
          <b-input disabled v-model="property.data"></b-input>
        </b-field>
        <hr>
        <b-field label="Previous Owner" type="is-primary">
          <b-input disabled v-model="property.previousOvner"></b-input>
        </b-field>
        <b-field label="Date" type="is-primary">
          <b-input disabled v-model="property.purchaseDate"></b-input>
        </b-field>
      </div>
    </div>
    <div v-if="property.ifForSale" class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40 has-height-350">
        <p class="title is-1">Offer</p>
        <b-field label="Price" type="is-primary">
          <b-input disabled v-model="property.offer.price"></b-input>
        </b-field>
        <b-field label="Buyer" type="is-primary">
          <b-input disabled v-model="property.offer.buyer">></b-input>
        </b-field>
        <b-button class="has-margin-top-30" type="is-accent" icon-right="trash" expanded @click="confirmDeleteOffer(property.id)">
                Delete
        </b-button>
      </div>
    </div>
     <div v-else class="tile is-parent has-margin-15 has-height-200">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Offer</p>
        <b-button class="has-margin-top-30" type="is-accent" icon-right="handshake" expanded @click="isComponentModalActive = true, formProps.propertyId = property.id">
                Creat Offer
        </b-button>
      </div>
    </div>
  </div>
  <b-modal :active.sync="isComponentModalActive"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="false"
                 aria-role="dialog"
                 aria-modal>
            <create-offer-modal v-bind="formProps"></create-offer-modal>
  </b-modal>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CreateOfferModal from './CreateOfferModal.vue'

export default {
  name: 'MyProperties',
  components: {
    CreateOfferModal
  },
  data: function () {
    return {
      isComponentModalActive: false,
      formProps: {
        propertyId: 0
      }
    }
  },
  methods: {
    ...mapActions(['loadMyPropertiesProperty', 'removeOffer']),
    showErrorAlert (message) {
      this.$buefy.notification.open({
        duration: 5000,
        message: message,
        type: 'is-danger',
        hasIcon: true
      })
    },
    confirmDeleteOffer (propertyId) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure that you want to remove offer?',
        type: 'is-accent',
        onConfirm: () => {
          this.removeOffer(propertyId)
          this.$buefy.toast.open('User confirmed')
        }
      })
    }
  },
  computed: {
    ...mapState({
      myProperties: state => state.myProperties.propertyList
    }),
    ...mapGetters(['isUserDataLoaded'])
  },
  mounted () {
    if (this.isUserDataLoaded) {
      this.loadMyPropertiesProperty()
        .catch(e => this.showErrorAlert(e.message))
    }
  },
  watch: {
    isUserDataLoaded: function () {
      this.loadMyPropertiesProperty()
        .catch(e => this.showErrorAlert(e.message))
    }
  }
}
</script>

<style scoped>
</style>
