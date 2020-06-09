export const notifications = {
  methods: {
    successNotification (message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        type: 'is-success'
      })
    },
    warningNotification (message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        type: 'is-warning'
      })
    },
    errorNotification (message) {
      this.$buefy.toast.open({
        duration: 10000,
        message: message,
        type: 'is-danger'
      })
    },
    confirmAcctionInMetaMaskNotification () {
      this.warningNotification('Please confirm the acction in Metamask')
    }
  }
}
