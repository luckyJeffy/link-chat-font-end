import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO('http://127.0.0.1:7001', {
      autoConnect: false
    })
  })
)
