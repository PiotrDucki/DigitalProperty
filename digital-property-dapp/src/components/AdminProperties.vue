<template>
<section>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
    <div slot="trigger" class="panel-heading center" role="button" aria-controls="contentIdForA11y2">
      <strong>Properties</strong>
    </div>
    <div class="tile is-ancestor has-padding-top-50 has-padding-bottom-50">
      <div class="tile is-parent is-vertical has-margin-15">
        <div class="tile is-child box notification has-padding-40 has-height-200">
          <p class="title is-1">Search</p>
          <b-field grouped type="is-primary">
            <b-input v-model="searchedUser.address" placeholder="User Address" expanded></b-input>
            <p class="control">
              <button class="button is-accent" @click="search">Search</button>
            </p>
          </b-field>
        </div>
        <div v-for="property in searchedUser.properties" :key="property.id">
          <div class=" has-margin-20">
          </div>
          <div class="tile is-child box notification">
            <b-field label="Id" type="is-primary">
              <b-input v-model="property.id" disabled></b-input>
            </b-field>
            <b-field label="Data" type="is-primary">
              <b-input v-model="property.data" disabled></b-input>
            </b-field>
            <b-field label="Is For Sale" type="is-primary">
              <b-checkbox v-model="property.isForSale" disabled></b-checkbox>
            </b-field>
          </div>
        </div>
      </div>
      <div class="tile is-parent has-margin-15">
        <div class='tile is-child box notification has-padding-40 has-height-350'>
          <p class="title is-1">Add Poperty</p>
          <b-field label="Owner Address" type="is-primary">
            <b-input v-model="newPopperty.ownerAddress" required></b-input>
          </b-field>
          <b-field label="Data" type="is-primary">
            <b-input v-model="newPopperty.data" required></b-input>
          </b-field>
          <b-button class="has-margin-top-30" type="is-accent" icon-right="plus" expanded @click="addProperty">
            Add Poperty
          </b-button>
        </div>
      </div>
    </div>
  </b-collapse>
</section>
</template>

<script>
import {
  notifications
} from './elements/notifications.js'
import {
  loadUserPropertiesContracCall,
  addPropertyContracCall
} from '@/util/contractAPI'
import { isAddresValid } from '@/util/validation'

export default {
  name: 'AdminTransactions',
  mixins: [notifications],
  data: function () {
    return {
      searchedUser: {
        address: '',
        properties: []
      },
      newPopperty: {
        ownerAddress: '',
        data: ''
      }
    }
  },
  methods: {
    search () {
      if (isAddresValid(this.searchedUser.address)) {
        loadUserPropertiesContracCall(this.searchedUser.address)
          .then(result => this.prcessContractData(result))
          .catch(e => this.errorNotification(e.message))
      } else {
        this.errorNotification(`Invalid Address`)
      }
    },
    addProperty () {
      if (isAddresValid(this.newPopperty.ownerAddress)) {
        addPropertyContracCall(this.newPopperty)
          .catch(e => this.errorNotification(e.message))
        this.confirmAcctionInMetaMaskNotification()
      } else {
        this.errorNotification(`Invalid Address`)
      }
    },
    prcessContractData (result) {
      console.log(result)
      var nuberOfProperties = result[0].length
      this.searchedUser.properties = []
      for (var i = 0; i < nuberOfProperties; i++) {
        var property = {
          id: result[0][i],
          data: result[1][i],
          isForSale: result[2][i]
        }
        this.searchedUser.properties.push(property)
      }
    }
  }
}
</script>
