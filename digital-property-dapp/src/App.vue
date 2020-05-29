<template>
  <div id="app">
    <b-navbar shadow>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1 class="is-size-4">Digital Propery</h1>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Offer
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
        <div class="block-spacing"></div>
        <b-navbar-item tag="div">
          <b-button rounded class="is-accent" v-on:click='logInUser'>Log In</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logInUser'])
  }
}

</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #030231;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);
  $accent: #E9586B;
  $accent-invert: findColorInvert($accent);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: ("white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert),
    "accent": ($accent, $accent-invert));

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Navigation
  $navbar-height: 4.5rem;

  // Import Bulma and Buefy styles
  // Import Bulma's core
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
