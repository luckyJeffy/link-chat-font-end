<style rel="stylesheet/scss" lang="scss" scoped>
.layout {
  height: 100%;
  background: #ffffff;
  .layout-wrap {
    display: flex;
    flex-direction: column;
    .layout-content {
      flex: 1;
    }
  }
  .layout-notification {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .layout-modal-container {
    /deep/ .v--modal-overlay {
      background: rgba(0, 0, 0, 0.6);
    }
    /deep/ .v--modal {
      border-radius: 6px;
    }
  }
}
</style>

<template>
  <div class="layout">
    <div class="layout-wrap">
      <NavBar class="layout-header" />
      <message-panel class="layout-content"></message-panel>
    </div>
    <div class="layout-notification">
      <transition v-if="notificationShow" :duration="2000" mode="out-in" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
        <notification :key="status" :breathing="status === 'matching'">{{notificationMessage}}</notification>
      </transition>
    </div>
    <modals-container class="layout-modal-container" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { createUniqueString } from '@/utils/createUniqueString'
import NavBar from './components/NavBar'
import MessagePanel from './components/MessagePanel'
import Notification from './components/Notification'
import MatchModal from './components/MatchModal'
import LeaveModal from './components/LeaveModal'

export default {
  // sockets: {
  //   connect: function() {
  //     this.sockets.subscribe(this.userId, this.receiveMessage)
  //     this.sockets.subscribe(this.room, this.receiveMessage)
  //   },
  //   connected: function(message) {
  //     if (this.status == 'matched') {
  //       const { clients } = message
  //       console.log(clients)
  //       if (clients.length === 2) {
  //         clients.map(client => {
  //           if (client !== this.userId) {
  //             this.setTarget('client')
  //             this.setStatus('connected')
  //           }
  //         })
  //       }
  //       this.$Message.error('Clients > 3, please try agian later or contact administrator.');
  //     }
  //   },
  //   disconnect: function(reason) {
  //     // todo 确定 reason
  //     if (reason !== 'ping time out') {
  //       this.sockets.unsubscribe(this.userId)
  //       this.sockets.unsubscribe(this.room)
  //       this.$socket.io.opts.autoConnect = false
  //       // this.leaveRoom()
  //     }
  //   },
  // },
  components: {
    NavBar,
    MessagePanel,
    Notification
  },
  computed: {
    ...mapGetters(['userId', 'target', 'room', 'status', 'modal']),
    notificationShow() {
      return this.status === 'connected' ? false : true
    },
    notificationMessage() {
      switch (this.status) {
        case 'matching': return 'Looking for someone you can chat with…'
        case 'matched': return 'You are chatting with a random stranger. Say Hi!'
        default: return
      }
    }
  },
  methods: {
    ...mapActions(['leaveRoom', 'addHistory', 'setTarget', 'setStatus']),
    connectSocketServer() {
      const socket = this.$socket
      socket.io.opts.query = {
        room: this.room,
        userId: this.userId
      }
      // fix macos chrome timeout disconnect issuse
      // https://github.com/socketio/socket.io/issues/3259
      socket.io.timeout(30000)
      socket.io.opts.autoConnect = true
      socket.io.connect()
    },
    sendMessage(content) {
      const mid = createUniqueString()
      const sendDate = new Date()
      this.$socket.emit('exchange', {
        mid,
        sendDate,
        target: this.target,
        playload: {
          content
        }
      })
      this.addHistory({ mid, source: 'own', sendDate, content })
    },
    receiveMessage(message) {
      const { meta, data } = message
      const { timestamp, client, target, mid } = meta
      const { playload, action } = data
      const { content } = playload
      // 对方离开房间
      // if (action === 'leave' && target === this.userId) {
      //   this.$socket.disconnect()
      //   return
      // }
      const source = target === this.room ? 'server' : 'stranger'
      this.addHistory({
        mid,
        source,
        timestamp,
        content
      })
    },
  },
  mounted() {
    const socket = this.$socket
    socket.on('connect', function() {
      this.sockets.subscribe(this.userId, this.receiveMessage)
      this.sockets.subscribe(this.room, this.receiveMessage)
    })
    socket.on('connected', function(message) {
      if (this.status == 'matched') {
        const { clients } = message
        console.log(clients)
        if (clients.length === 2) {
          clients.map(client => {
            if (client !== this.userId) {
              this.setTarget('client')
              this.setStatus('connected')
            }
          })
        }
        this.$Message.error('Clients > 3, please try agian later or contact administrator.');
      }
    })
    socket.on('disconnect', function(reason) {
      // todo 确定 reason
      if (reason !== 'ping time out') {
        this.sockets.unsubscribe(this.userId)
        this.sockets.unsubscribe(this.room)
        this.$socket.io.opts.autoConnect = false
        // this.leaveRoom()
      }
    })
    // connect when ready
    this.connectSocketServer()
    this.$watch(function() {
      return this.modal
    }, function(newModal) {
      let modalComponent
      const { name, componentProp, modalParam, eventListeners } = newModal
      switch (name) {
        case 'leaveModal':
          modalComponent = LeaveModal
          break;

        case 'matchModal':
          modalComponent = MatchModal
          break

        default: return;
      }
      this.$modal.show(modalComponent, componentProp, modalParam, eventListeners)
    }, {
        deep: true
      })
  }
}
</script>
