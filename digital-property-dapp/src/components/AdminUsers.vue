<template>
<section>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
    <div slot="trigger" class="panel-heading center" role="button" aria-controls="contentIdForA11y2">
      <strong>User</strong>
    </div>
    <div class="tile is-ancestor has-padding-20">
      <div class="tile is-parent has-margin-15">
        <div class="tile is-child box notification has-padding-40">
          <p class="title is-1">Search</p>
          <b-field grouped type="is-primary">
            <b-input v-model="userAddress" placeholder="User Address" expanded></b-input>
            <p class="control">
              <button class="button is-accent" @click="search">Search</button>
            </p>
          </b-field>
          <b-field label="User Pesel Hash" type="is-primary">
            <b-input v-model="peselHash" disabled></b-input>
          </b-field>
          <b-button class="has-margin-top-30" type="is-accent" icon-right="handshake" expanded @click="promptNumber">
            Verify Pesel
          </b-button>
        </div>
      </div>
      <div class="tile is-parent has-margin-15">
        <div class='tile is-child box notification has-padding-40'>
          <p class="title is-1">Add user</p>
          <b-field label="Address" type="is-primary">
            <b-input v-model="newUser.address"></b-input>
          </b-field>
          <b-field label="Pesel" type="is-primary">
            <b-input v-model="newUser.pesel"></b-input>
          </b-field>
          <b-button class="has-margin-top-30" type="is-accent" icon-right="handshake" expanded @click="addUser">
            Add User
          </b-button>
        </div>
      </div>
    </div>
  </b-collapse>
</section>
</template>

<script>
import {
  mapActions
} from 'vuex'
import {
  notifications
} from './elements/notifications.js'
import {
  addUserContracCall,
  loadUserDataContracCall
} from '@/util/contractAPI'
import forge from 'node-forge'

export default {
  name: 'AdminUsers',
  mixins: [notifications],
  data: function () {
    return {
      userAddress: '',
      peselHash: '',
      newUser: {
        address: '',
        pesel: '',
        peselHash: ''
      }
    }
  },
  methods: {
    ...mapActions(['']),
    search () {
      loadUserDataContracCall(this.userAddress)
        .then((result) => {
          this.peselHash = result
        })
    },
    addUser () {
      this.newUser.peselHash = this.calculateHash(this.newUser.pesel)
      addUserContracCall(this.newUser)
      this.confirmAcctionInMetaMaskNotification()
    },
    promptNumber () {
      this.$buefy.dialog.prompt({
        message: `User Pesel`,
        type: 'is-accent',
        inputAttrs: {
          type: 'text',
          placeholder: '90260807894',
          length: 11
        },
        trapFocus: true,
        onConfirm: (value) => {
          console.log(typeof this.calculateHash(value))
          console.log('calculated val' + this.calculateHash(value.toString()))
          console.log(typeof this.peselHash)
          console.log('value from web3 val' + this.peselHash)
          if (this.peselHash.equals(this.calculateHash(value).equals())) {
            this.successNotification('correct')
          } else {
            this.errorNotification('not correct')
          }
        }
      })
    },
    calculateHash (input) {
      var md = forge.md.sha256.create()
      md.update(input)
      return this.md.digest().toHex()
    }
  },
  created () {
  }
}
</script>
