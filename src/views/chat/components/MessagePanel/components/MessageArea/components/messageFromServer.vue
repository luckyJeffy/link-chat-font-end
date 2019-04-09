<style rel="stylesheet/scss" lang="scss" scoped>
 .message-from-server-wrap {
   margin: 10px 0;
   font-size: 14px;
   color: #24292D;
   text-align: center;
 }
</style>

<template>
  <div class="message-from-server-wrap">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>
