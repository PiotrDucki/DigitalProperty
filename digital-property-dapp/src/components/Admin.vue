<template>
<div>
  <admin-users/>
  <section>
    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
      <div slot="trigger" class="panel-heading center" role="button" aria-controls="contentIdForA11y2">
        <strong>User</strong>
      </div>
      <div class="tile is-ancestor has-padding-20">
        <div class="tile is-parent has-margin-15">
          <div class="tile is-child box notification has-padding-40">
            <p class="title is-1">Search By ID</p>
            <b-field grouped type="is-primary">
              <b-input number="propertyId" placeholder="User ID" expanded></b-input>
              <p class="control">
                <button class="button is-accent" v-on:click="search()">Search</button>
              </p>
            </b-field>
            <b-field label="User Pesel Hash" type="is-primary">
              <b-input disabled></b-input>
            </b-field>
          </div>
        </div>
        <div class="has-height-150 tile is-parent has-margin-15">
          <div class='tile is-child box notification has-padding-40'>
            <p class="title is-1">Offer</p>
            <div>
              <b-field label="Price" type="is-primary">
                <b-input disabled ></b-input>
              </b-field>
              <b-field label="Buyer" type="is-primary">
                <b-input disabled ></b-input>
              </b-field>
              <b-button  type="is-accent is-medium has-margin-top-30 " expanded v-on:click="buyProperty()">Buy</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </section>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { notifications } from './elements/notifications.js'
import AdminUsers from './AdminUsers.vue'
import {} from '@/util/contractAPI'

export default {
  name: 'Admin',
  mixins: [notifications],
  components: {
    AdminUsers
  },
  data: function () {
    return {
    }
  },
  methods: {
    ...mapActions([''])
  },
  computed: {
    ...mapState({
      myProperties: state => state.myProperties.propertyList
    }),
    ...mapGetters([''])
  },
  mounted () {},
  watch: {}
}
</script>

<style scoped>
</style>
