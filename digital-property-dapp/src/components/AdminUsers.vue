<template>
<section>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
    <div slot="trigger" class="panel-heading center" role="button" aria-controls="contentIdForA11y2">
      <strong>Users</strong>
    </div>
    <div class="tile is-ancestor has-padding-top-50 has-padding-bottom-50">
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
          <b-button class="has-margin-top-30" type="is-accent" icon-right="check-square" expanded @click="promptVerifyPesel">
            Verify Pesel
          </b-button>
        </div>
      </div>
      <div class="tile is-parent has-margin-15">
        <div class='tile is-child box notification has-padding-40'>
          <p class="title is-1">Add User</p>
          <b-field label="Address" type="is-primary">
            <b-input v-model="newUser.address" required></b-input>
          </b-field>
          <b-field label="Pesel" type="is-primary">
            <b-input v-model.number="newUser.pesel" required></b-input>
          </b-field>
          <b-button class="has-margin-top-30" type="is-accent" icon-right="user-plus" expanded @click="addUser">
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
  notifications
} from './elements/notifications.js'
import {
  addUserContracCall,
  loadUserDataContracCall
} from '@/util/contractAPI'
import { isAddresValid, isPeselValid } from '@/util/validation'
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
    search () {
      if (isAddresValid(this.userAddress)) {
        loadUserDataContracCall(this.userAddress)
          .then((result) => { this.peselHash = result })
          .catch(e => this.errorNotification(e.message))
      } else {
        this.errorNotification(`Invalid Address`)
      }
    },
    addUser () {
      if (!isAddresValid(this.newUser.address)) {
        this.errorNotification(`Invalid Address`)
      } else if (!isPeselValid(this.newUser.pesel)) {
        this.errorNotification(`Invalid Pesel`)
      } else {
        this.newUser.peselHash = this.calculateHash(this.newUser.pesel.toString())
        addUserContracCall(this.newUser)
        this.confirmAcctionInMetaMaskNotification()
      }
    },
    promptVerifyPesel () {
      this.$buefy.dialog.prompt({
        message: `User Pesel`,
        type: 'is-accent',
        inputAttrs: {
          type: 'text',
          placeholder: '97102701234',
          length: 11
        },
        trapFocus: true,
        onConfirm: (value) => {
          if (this.peselHash === this.calculateHash(value)) {
            this.successNotification('Hash and pesel are matching')
          } else {
            this.errorNotification('Hash and pesel are not matching')
          }
        }
      })
    },
    calculateHash (input) {
      var md = forge.md.sha256.create()
      md.update(input)
      return md.digest().toHex()
    }
  }
}
</script>
