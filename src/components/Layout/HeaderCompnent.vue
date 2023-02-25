<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col header__title">
          <p>Where in the world ?</p>
        </div>
        <div class="col header__dark-mode-btn">
          <button @click="darkModeToggling">
            <img src="../../assets/images/moon-regular.svg" /> Dark Mode
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    darkModeToggling() {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        this.enableDarkMode();
      } else {
        this.disableDarkMode();
      }
    },
    enableDarkMode() {
      localStorage.setItem("theme", "light");
      document.body.classList.add("dark-mode");
    },

    disableDarkMode() {
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("dark-mode");
    },
  },
  mounted() {},
};
</script>
