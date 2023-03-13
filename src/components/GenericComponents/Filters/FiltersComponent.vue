<template>
  <div class="row cards-listing__actions">
    <div class="col-lg-4 col-md-4 col-12 cards-listing__input">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"
          ><ion-icon name="search"></ion-icon
        ></span>
        <input
          v-model="countryInput"
          type="text"
          class="form-control"
          placeholder="Search for a country...."
          aria-label="Username"
          aria-describedby="addon-wrapping"
          @keyup.enter="filterDataByCountryName(countryInput)"
          @input="filterDataByCountryName(countryInput)"
        />
      </div>
      <div class="cards-listing__inputValidation" v-if="!isValidCharLength">
        Please enter at least 3 characters
      </div>
    </div>
    <div class="col-lg-8 col-md-8 col-12 cards-listing__dropdown">
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ dropDownText }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a
              @click="filterDataByRegion('Africa')"
              class="dropdown-item"
              href="#"
              >Africa</a
            >
          </li>
          <li>
            <a
              @click="filterDataByRegion('Americas')"
              class="dropdown-item"
              href="#"
              >America</a
            >
          </li>
          <li>
            <a
              @click="filterDataByRegion('Asia')"
              class="dropdown-item"
              href="#"
              >Asia</a
            >
          </li>
          <li>
            <a
              @click="filterDataByRegion('Europe')"
              class="dropdown-item"
              href="#"
              >Europe</a
            >
          </li>
          <li>
            <a
              @click="filterDataByRegion('Oceania')"
              class="dropdown-item"
              href="#"
              >Oceania</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isValidCharLength"],
  data() {
    return {
      countryInput: "",
      dropDownText: "Filter by Region",
    };
  },
  methods: {
    filterDataByCountryName(countryName) {
      this.$emit("countryName", countryName);
    },
    filterDataByRegion(region) {
      document.querySelector(".form-control").value = "";
      this.$emit("countryRegion", region);
    },
  },
};
</script>
