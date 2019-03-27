<style rel="stylesheet/scss" lang="scss" scoped>
.nav-bar {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  background: #24292d;
  .nav-bar-brand {
    padding: 0.625rem 0;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    color: #ffffff;
    span {
      padding: 0 0.2rem;
    }
  }
}
</style>

<template>
  <div class="nav-bar">
    <div class="nav-bar-brand">
      <i-icon
        type="md-link"
        size="30"
      />
      <span>LinkChat</span>
    </div>
  </div>
</template>