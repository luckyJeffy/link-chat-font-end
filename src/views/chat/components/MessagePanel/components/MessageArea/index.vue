<style rel="stylesheet/scss" lang="scss" scoped>
.message-content {
  padding: 0 1rem;
  width: 100%;
  min-height: 70%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>

<template>
  <div class="message-content">
    <div
      v-for="message in messages"
      :key="message.mid"
      class="message-wrap"
    >
      <message-from-server v-if="message.source === 'server'" :message="message.content"></message-from-server>
      <message-from-user
        v-else
        :messageSource="message.source"
        :messageTimestamp="message.timestamp"
        :message="message.content"
      ></message-from-user>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageFromUser from './components/messageFromUser'
import MessageFromServer from './components/messageFromServer'

export default {
  components: {
    MessageFromUser,
    MessageFromServer
  },
  computed: {
    ...mapGetters(['messages'])
  }
}
</script>
