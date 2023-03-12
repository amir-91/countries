<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script>
import Header from "./components/Layout/HeaderCompnent.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";
</style>
