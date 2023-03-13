<template>
  <div v-if="!isLoading && !isError" class="container cards-listing">
    <filters-component
      @countryName="filterDataByCountryName($event)"
      @countryRegion="filterDataByRegion($event)"
      :isValidCharLength="isValidCharLength"
    ></filters-component>
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
import FiltersComponent from "@/components/GenericComponents/Filters/FiltersComponent.vue";
import ErrorPage from "../../components/GenericComponents/ErrorPage/ErrorPage.vue";
export default {
  components: {
    ListingCard,
    CardDetails,
    ErrorPage,
    FiltersComponent,
  },
  data() {
    return {
      countriesData: [],
      filteredData: [],
      countryInput: "",
      isLoading: true,
      isFiltered: false,
      isError: false,
      showPopup: false,
      selectedCountry: "",
      selectedCountryData: [],
      isValidCharLength: true,
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
      this.dropDownText = "Filter by Region";
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
