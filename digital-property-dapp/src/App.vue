<template>
  <div id="app">
    <b-navbar shadow>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <p class="title is-1 is-spaced">Digital Property</p>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/property' }">
          Property
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
        <div class="block-spacing"></div>
        <b-navbar-item tag="div">
          <b-button v-if="isUserUnregisterd" rounded class="is-accent">Register</b-button>
          <b-button v-if="isUserRegisterd" rounded class="is-accent"
          tag="router-link" :to="{ path: '/my-properties' }">My Properties</b-button>
          <b-button v-if="isUserAdmin" rounded class="is-accent"
          tag="router-link" :to="{ path: '/admin' }">Admin</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="section ">
      <router-view />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { notifications } from './components/elements/notifications.js'

export default {
  name: 'App',
  mixins: [notifications],
  computed: {
    ...mapState({
      web3: state => state.web3
    }),
    ...mapGetters(['isUserRegisterd', 'isUserUnregisterd', 'isUserAdmin'])
  },
  methods: {
    ...mapActions(['registerWeb3']),
    registerWeb3AndShowNotification () {
      this.registerWeb3()
        .then(result => this.successNotification('Connection established'))
        .catch(e => this.errorNotification(e.message))
    }
  },
  created () {
    this.registerWeb3AndShowNotification()
    window.ethereum.on('accountsChanged', (accounts) => {
      this.registerWeb3AndShowNotification()
    })
  }
}

</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  // Adding spacers
  $sizeUnit: rem;
  $marginKey: 'm';
  $paddingKey: 'p';
  $separator: '-';
  $sizes: (
      ('none', 0),
      ('xxs', 0.125),
      ('xs', 0.25),
      ('sm', 0.5),
      ('md', 1),
      ('lg', 2),
      ('xl', 4),
      ('xxl', 8),
  );
  $positions: (
      ('t', 'top'),
      ('r', 'right'),
      ('b', 'bottom'),
      ('l', 'left')
  );

  @function sizeValue($key, $value) {
      @return if($key == 'none', 0, $value + $sizeUnit);
  }

  @each $size in $sizes {
      $sizeKey: nth($size, 1);
      $sizeValue: nth($size, 2);
      .#{$marginKey}#{$separator}#{$sizeKey} {
          margin: sizeValue($sizeKey, $sizeValue);
      }
      .#{$paddingKey}#{$separator}#{$sizeKey} {
          padding: sizeValue($sizeKey, $sizeValue);
      }
      @each $position in $positions {
          $posKey: nth($position, 1);
          $posValue: nth($position, 2);
          .#{$marginKey}#{$separator}#{$posKey}#{$separator}#{$sizeKey} {
              margin-#{$posValue}: sizeValue($sizeKey, $sizeValue);
          }
          .#{$paddingKey}#{$separator}#{$posKey}#{$separator}#{$sizeKey} {
              padding-#{$posValue}: sizeValue($sizeKey, $sizeValue);
          }
      }
  }

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
