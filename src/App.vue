<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import 'scss/core.scss';
#app {
  height: 100%
}
</style>
