<style rel="stylesheet/scss" lang="scss" scoped>
.leave-modal-content {
  text-align: center;
  color: #24292d;
  .text-wrap {
    padding: 10px 0;
    h3 {
      padding: 10px 0;
    }
    p {
      padding: 10px 16px;
      font-size: 14px;
    }
  }
  .buttons-wrap {
    display: flex;
    flex: 0 1 auto;
    width: 100%;
    border-top: 1px solid #24292d;
    button {
      flex: 1;
      font-size: 14px;
      background: transparent;
      padding: 0;
      margin: 0;
      border: 0;
      cursor: pointer;
      box-sizing: border-box;
      line-height: 48px;
      height: 48px;
      outline: none;
    }
    button:not(:first-of-type) {
      border-left: 1px solid #24292d;
    }
  }
}
</style>

<template>
  <div class="leave-modal-content">
    <div class="text-wrap">
      <h3>Are you sure to leave?</h3>
      <p>Stranger will not be able to send or receive your message</p>
    </div>
    <div class="buttons-wrap">
      <button @click="leave">Leave</button>
      <button>Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['status', 'target', 'room'])
  },
  methods: {
    leave() {
      if (this.status === 'connected') {
        // this.$socket.emit('leave', {
        //   target: this.target,
        // })
        // this.$socket.disconnect()
        this.$socket.emit('leave', { room: this.room })
      }
    }
  }
}
</script>
