<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col header__title">
          <a href="/">Where in the world ?</a>
        </div>
        <div class="col header__dark-mode-btn">
          <button @click="darkModeToggling">
            <ion-icon name="moon"></ion-icon> Dark Mode
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
      if (theme === "light") {
        this.enableDarkMode();
      } else {
        this.disableDarkMode();
      }
    },
    enableDarkMode() {
      window.localStorage.setItem("theme", "dark");
      document.body.classList.add("dark-mode");
    },

    disableDarkMode() {
      window.localStorage.setItem("theme", "light");
      document.body.classList.remove("dark-mode");
    },
    enableThemeOnreload() {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        this.enableDarkMode();
      } else {
        this.disableDarkMode();
      }
    },
  },
  mounted() {
    this.enableThemeOnreload();
  },
};
</script>
