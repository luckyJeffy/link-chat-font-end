<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  .bottom-wrap {
    width: 100%;
  }
}
</style>

<template>
  <div class="content">
    <message-area :style="messageAreaHight"></message-area>
    <div class="bottom-wrap">
      <sending-panel></sending-panel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SendingPanel from './components/SendingPanel'
import MessageArea from './components/MessageArea'

export default {
  components: {
    SendingPanel,
    MessageArea
  },
  data() {
    return {
      currentClientHeght: 0
    }
  },
  computed: {
    messageAreaHight() {
      return { height: this.currentClientHeght - 50 - 56 + 'px' } // Subtract nav bar and bottom wrap height
    }
  },
  beforeMount() {
    this.currentClientHeght = document.documentElement.clientHeight || document.body.clientHeight
    window.onresize = () => {
      this.currentClientHeght = document.documentElement.clientHeight || document.body.clientHeight
    }
  }
}
</script>
