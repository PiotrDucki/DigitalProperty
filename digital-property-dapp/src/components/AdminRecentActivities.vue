<template>
<section>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
    <div slot="trigger" class="panel-heading center" role="button" aria-controls="contentIdForA11y2">
      <strong>Recent Activities</strong>
    </div>
    <div class="tile is-ancestor has-padding-top-50 has-padding-bottom-50 has-min-height-650">
      <div class="tile is-parent is-vertical has-margin-15">
        <div class="tile is-child box notification has-padding-40">
          <p class="title is-1">Transactions - Last 24h</p>
          <b-button class="has-margin-top-40" type="is-accent" icon-right="list-ul" expanded @click="getRecentTransations">
            Show List
          </b-button>
        </div>
        <div v-for="transaction in transactions" :key="transaction.id">
          <div class=" has-margin-20">
          </div>
          <div class="tile is-child box notification">
            <b-field label="Id" type="is-primary">
              <b-input v-model="transaction.id" disabled></b-input>
            </b-field>
            <b-field label="Price" type="is-primary">
              <b-input v-model="transaction.price" disabled></b-input>
            </b-field>
            <b-field label="Seller" type="is-primary">
              <b-input v-model="transaction.sellerAddres" disabled></b-input>
            </b-field>
            <b-field label="Buyer" type="is-primary">
              <b-input v-model="transaction.buyerAddres" disabled></b-input>
            </b-field>
            <b-field label="Date" type="is-primary">
              <b-input v-model="transaction.date" disabled></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="tile is-parent is-vertical has-margin-15">
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
  loadRecentTransactionsContracCall
} from '@/util/contractAPI'

export default {
  name: 'AdminRecentActivities',
  mixins: [notifications],
  data: function () {
    return {
      transactions: []
    }
  },
  methods: {
    getRecentTransations () {
      loadRecentTransactionsContracCall()
        .then(result => this.prcessPropertyTransationsData(result))
        .catch(e => this.errorNotification(e.message))
    },
    prcessPropertyTransationsData (result) {
      console.log(result)
      var nuberOfTransactions = result[0].length
      this.transactions = []
      for (var i = 0; i < nuberOfTransactions; i++) {
        const d = new Date(result[4][i] * 1000)
        const date = d.toISOString().split('T')[0]
        const time = d.toTimeString().split(' ')[0]
        const formatedDate = `${date} ${time}`
        var transaction = {
          id: result[0][i],
          price: result[1][i],
          sellerAddres: result[2][i],
          buyerAddres: result[3][i],
          date: formatedDate
        }
        this.transactions.push(transaction)
      }
    }
  }
}
</script>
