<template>
<section>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
    <div slot="trigger" class="panel-heading center" role="button" aria-controls="contentIdForA11y2">
      <strong>Transactions</strong>
    </div>
    <div class="tile is-ancestor has-padding-top-50 has-padding-bottom-50 has-min-height-600">
      <div class="tile is-parent is-vertical has-margin-15">
        <div class="tile is-child box notification has-padding-40">
          <p class="title is-1">Poperty History</p>
          <b-field grouped type="is-primary">
            <b-input v-model.number="searchedProperty.id" placeholder="Property Id" type='number' expanded></b-input>
            <p class="control">
              <button class="button is-accent" @click="getPropertyTransations">Search</button>
            </p>
          </b-field>
        </div>
        <div v-for="transaction in searchedProperty.transactions" :key="transaction.id">
          <div class=" has-margin-20">
          </div>
          <div class="tile is-child box notification">
            <b-field label="Id" type="is-primary">
              <b-input v-model="transaction.id" disabled></b-input>
            </b-field>
            <b-field label="Price [ETH]" type="is-primary">
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
      <div class="tile is-parent is-vertical has-margin-15 has-height-600">
        <div class="tile is-child box notification has-padding-40">
          <p class="title is-1">Search</p>
          <b-field grouped type="is-primary">
            <b-input v-model.number="searchedTransaction.id" placeholder="Transaction Id" type='number' expanded></b-input>
            <p class="control">
              <button class="button is-accent" @click="getTransation">Search</button>
            </p>
          </b-field>
          <b-field label="Property Id" type="is-primary">
              <b-input disabled></b-input>
            </b-field>
           <b-field label="Price [ETH]" type="is-primary">
              <b-input v-model="searchedTransaction.price" disabled></b-input>
            </b-field>
            <b-field label="Seller" type="is-primary">
              <b-input v-model="searchedTransaction.sellerAddres" disabled></b-input>
            </b-field>
            <b-field label="Buyer" type="is-primary">
              <b-input v-model="searchedTransaction.buyerAddres" disabled></b-input>
            </b-field>
            <b-field label="Date" type="is-primary">
              <b-input v-model="searchedTransaction.date" disabled></b-input>
            </b-field>
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
  loadPropertytTransactionsContracCall,
  loadTransactionContracCall
} from '@/util/contractAPI'
import { isIdValid } from '@/util/validation'

export default {
  name: 'AdminTransactions',
  mixins: [notifications],
  data: function () {
    return {
      searchedProperty: {
        id: '',
        transactions: []
      },
      searchedTransaction: {
        id: '',
        price: '',
        sellerAddres: '',
        buyerAddres: '',
        date: ''
      }
    }
  },
  methods: {
    getPropertyTransations () {
      if (isIdValid(this.searchedProperty.id)) {
        loadPropertytTransactionsContracCall(this.searchedProperty.id)
          .then(result => this.prcessPropertyTransationsData(result))
          .catch(e => this.errorNotification(e.message))
      } else {
        this.errorNotification(`Invalid Id`)
      }
    },
    getTransation () {
      if (isIdValid(this.searchedTransaction.id)) {
        loadTransactionContracCall(this.searchedTransaction.id)
          .then(result => this.prcessPropertyTransationData(result))
          .catch(e => this.errorNotification(e.message))
      } else {
        this.errorNotification(`Invalid Id`)
      }
    },
    prcessPropertyTransationsData (result) {
      console.log(result)
      var nuberOfTransactions = result[0].length
      this.searchedProperty.transactions = []
      for (var i = 0; i < nuberOfTransactions; i++) {
        const d = new Date(result[4][i] * 1000)
        const date = d.toISOString().split('T')[0]
        const time = d.toTimeString().split(' ')[0]
        const formatedDate = `${date} ${time}`
        var transaction = {
          id: result[0][i],
          price: result[1][i] / 1000000000000000000,
          sellerAddres: result[2][i],
          buyerAddres: result[3][i],
          date: formatedDate
        }
        this.searchedProperty.transactions.push(transaction)
      }
    },
    prcessPropertyTransationData (result) {
      const d = new Date(result[4] * 1000)
      const date = d.toISOString().split('T')[0]
      const time = d.toTimeString().split(' ')[0]
      const formatedDate = `${date} ${time}`

      this.searchedTransaction.price = result[1] / 1000000000000000000
      this.searchedTransaction.sellerAddres = result[2]
      this.searchedTransaction.buyerAddres = result[3]
      this.searchedTransaction.date = formatedDate
    }
  }
}
</script>
