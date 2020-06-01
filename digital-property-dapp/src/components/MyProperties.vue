<template>
<div>
  <div class="tile is-ancestor">
    <div class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Property</p>
        <b-field label="Property Id" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <b-field label="Property Data" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <hr>
        <b-field label="Previous Owner" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <b-field label="Date" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <b-field label="Price" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
      </div>
    </div>
    <div class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40 has-height-350">
        <p class="title is-1">Offer</p>
        <b-field label="Price" type="is-primary">
          <b-input disabled></b-input>
        </b-field>
        <b-field label="Buyer" type="is-primary">
          <b-input disabled></b-input>
        </b-field>
        <b-button class="has-margin-top-30" type="is-accent" icon-right="trash" expanded>
                Delete
        </b-button>
      </div>
    </div>
  </div>

  <div class="tile is-ancestor">
    <div class="tile is-parent has-margin-15">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Property</p>
        <b-field label="Property Id" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <b-field label="Property Data" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <hr>
        <b-field label="Previous Owner" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <b-field label="Date" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
        <b-field label="Price" type="is-primary">
          <b-input disabled ></b-input>
        </b-field>
      </div>
    </div>
    <div class="tile is-parent has-margin-15 has-height-200">
      <div class="tile is-child box notification has-padding-40">
        <p class="title is-1">Offer</p>
        <b-button class="has-margin-top-30" type="is-accent" icon-right="handshake" expanded>
                Creat Offer
        </b-button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'

export default {
  name: 'MyProperties',
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
</style>
