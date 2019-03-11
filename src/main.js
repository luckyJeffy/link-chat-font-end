import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/iview.js'
import './plugins/animate.js'
import './plugins/vmodal.js'
import './plugins/vsocket.js'

import '@/styles/index.scss' // global css

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
