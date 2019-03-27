<style rel="stylesheet/scss" lang="scss" scoped>
.notification {
  text-align: center;
  font-size: 1.125rem;
  padding: 0 1rem;
}
.matching {
  animation: opacity 2s infinite alternate;
}

@keyframes opacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<template>
  <div :class="classList">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    breathing: Boolean
  },
  computed: {
    classList() {
      return ['notification', this.breathing ? 'matching' : '']
    }
  }
}
</script>

