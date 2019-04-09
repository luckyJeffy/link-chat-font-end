<style rel="stylesheet/scss" lang="scss" scoped>
.sending-panel {
  padding: 0.75rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999999;
  .leave-button-wrap {
    padding: 0 0.5rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .input-col-wrap {
    flex: 1;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, Arial, sans-serif;
    // Style for iView input component
    /deep/ .ivu-input {
      border: 1px solid #f1f1f1;
      color: #999999;
      background: #f1f1f1;
      resize: none;
      overflow-y: hidden;
    }
    /deep/ .ivu-input::-webkit-input-placeholder {
      color: #999999;
    }
  }
  .send-button-wrap {
    padding: 0 0.5rem;
    height: 2rem;
    line-height: 2rem;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="sending-panel">
    <div class="leave-button-wrap" @click="handleLeaveEvent">
      <span>{{ modalButtonName }}</span>
    </div>
    <div class="input-col-wrap">
      <i-input v-model="inputMessage" type="textarea" :autosize="textareaSize" placeholder="Write a message..." />
    </div>
    <div class="send-button-wrap" @click="addHistory">
      <i-icon type="md-send" size="16" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      textareaSize: { minRows: 1, maxRows: 6 },
      inputMessage: '',
      leaveModalDisplay: true
    }
  },
  computed: {
    ...mapGetters(['status']),
    modalButtonName() {
      return this.status === 'connected' ? 'LEAVE' : 'NEXT'
    }
  },
  methods: {
    ...mapActions(['addHistory', 'setModal']),
    handleLeaveEvent() {
      if (this.status === 'connected') {
        this.setModal({ name: 'leaveModal', timestamp: Date.parse(new Date()) })
      }
    },
    handleSendEvent() {
      if (this.status === 'connected') {
        if (this.inputMessage.length) {
          this.$emit('sendMessage', this.inputMessage)
          this.inputMessage = ''
        }
      }
    }
  }
}
</script>
