<template>
  <div v-if="!isLoading && !isError" class="container cards-listing">
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
    <div v-if="!isFiltered" class="row cards-listing__cards">
      <div
        v-for="(item, index) in countriesData"
        :key="index"
        class="col-xl-3 col-lg-4 col-md-6 col-12"
        @click="showPopUpDetails(item.name.common)"
      >
        <listing-card
          :name="item.name.common"
          :capital="item.capital"
          :region="item.region"
          :population="item.population"
          :flag="item.flags.png"
        ></listing-card>
      </div>
    </div>
    <div v-else class="row cards-listing__cards">
      <div
        v-for="(item, index) in filteredData"
        :key="index"
        class="col-xl-3 col-lg-4 col-md-6 col-12"
        @click="showPopUpDetails(item.name.common)"
      >
        <listing-card
          :name="item.name.common"
          :capital="item.capital"
          :region="item.region"
          :population="item.population"
          :flag="item.flags.png"
        ></listing-card>
      </div>
    </div>
    <div v-if="showPopup" class="cards-listing__details">
      <card-details
        @hidePopup="hidePopup($event)"
        :countryData="selectedCountryData"
        :allCountriesData="countriesData"
      ></card-details>
    </div>
    <div class="cards-listing__no-data-matched">
      <h1 v-if="filteredData.length == 0">No Data Matching your search</h1>
    </div>
  </div>
  <div v-if="isLoading && !isError" class="loader-container">
    <img src="../../assets/images/loading-gif.gif" />
  </div>
  <error-page v-if="isError"></error-page>
</template>

<script>
import { getAllCountries } from "../../services/services.js";
import ListingCard from "../../components/GenericComponents/ListingCards/ListingCard.vue";
import CardDetails from "../../views/CountriesDetailsView/CountriesDetails.vue";
import ErrorPage from "../../components/GenericComponents/ErrorPage/ErrorPage.vue";
export default {
  components: {
    ListingCard,
    CardDetails,
    ErrorPage,
  },
  data() {
    return {
      countriesData: [],
      filteredData: [],
      countryInput: "",
      isLoading: true,
      isFiltered: false,
      isError: false,
      isValidCharLength: true,
      dropDownText: "Filter by Region",
      showPopup: false,
      selectedCountry: "",
      selectedCountryData: [],
    };
  },
  methods: {
    getAllCountriesData() {
      getAllCountries(
        "https://restcountries.com/v3.1/all",
        (res) => {
          if (res.status == 200) {
            this.countriesData = JSON.parse(JSON.stringify(res.data));
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.isError = true;
          }
        },
        () => {
          this.isError = true;
        }
      );
    },
    filterDataByCountryName(countryName) {
      if (countryName.length < 3) {
        if (countryName.length == 0) {
          this.isValidCharLength = true;
          this.isFiltered = false;
        } else {
          this.isValidCharLength = false;
          this.isFiltered = false;
        }
      } else {
        this.isValidCharLength = true;
        this.isFiltered = true;
        this.isLoading = true;
        this.selectedCountry = countryName;
        this.filteredData = this.countriesData.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(countryName.toLowerCase());
        });
        this.isLoading = false;
      }
    },
    filterDataByRegion(region) {
      this.dropDownText = region;
      this.isFiltered = true;
      this.isLoading = true;
      this.filteredData = this.countriesData.filter((country) => {
        return country.region == region;
      });
      this.isLoading = false;
    },
    backToAllCountries() {
      window.location.reload();
    },
    getCountryDetails(country) {
      this.selectedCountryData = this.countriesData.filter(
        (selectedCountry) => {
          return selectedCountry.name.common == country;
        }
      );
    },
    showPopUpDetails(country) {
      this.getCountryDetails(country);
      this.showPopup = true;
      document.body.classList.add("--stop-scroll");
    },
    hidePopup(event) {
      this.showPopup = event;
      document.body.classList.remove("--stop-scroll");
    },
  },
  mounted() {
    this.getAllCountriesData();
  },
};
</script>
