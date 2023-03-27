<template>
  <Header></Header>
  <router-view></router-view>
  <Btn></Btn>
</template>

<script>
import Header from "./components/Layout/HeaderCompnent.vue";
import Btn from "./components/BackToTopBtn/BackToTopBtn.vue";

export default {
  name: "App",
  components: {
    Header,
    Btn
  },
};
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";
</style>
