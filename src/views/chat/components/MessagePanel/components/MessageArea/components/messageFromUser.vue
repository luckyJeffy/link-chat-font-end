<style rel="stylesheet/scss" lang="scss" scoped>
.message-row {
  margin: 10px 0;
  display: flex;
  align-items: flex-end;
  .message-date-wrap {
    font-size: 10px;
    color: #adadad;
  }
  .message-wrap {
    padding: 6px 10px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, Arial, sans-serif;
    color: #000000;
    border-radius: 6px;
    span {
      white-space: pre-wrap;
    }
  }
  .own {
    margin-left: 5px;
    background: #e4ecf2;
  }
  .stranger {
    margin-right: 5px;
    background: #f1f1f1;
  }
}
.align-right {
  justify-content: flex-end;
  .message-date-wrap {
    text-align: right;
  }
}
.align-left {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
</style>

<template>
  <div :class="messageRowWrap">
    <div class="message-date-wrap">
      <span> {{ formatDate(messageTimestamp) }}</span>
    </div>
    <div :class="messageWrap">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messageSource: String,
    messageTimestamp: [Date, String],
    message: String,
  },
  computed: {
    messageRowWrap() {
      return ['message-row', this.messageSource === 'own' ? 'align-right' : 'align-left']
    },
    messageWrap() {
      return ['message-wrap', this.messageSource === 'own' ? 'own' : 'stranger']
    }
  },
  methods: {
    formatDate(date) {
      date = typeof date === 'string' ? new Date(date) : date
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      const formattedTimeStr = `${hours}:${minutes} ${ampm}`
      return formattedTimeStr
    }
  }
}
</script>

