<template>
  <div v-if="!isLoading" class="container cards-listing">
    <div class="row cards-listing__actions">
      <div class="col-4 cards-listing__input">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            ><img src="../../assets/images/search.svg"
          /></span>
          <input
            v-model="countryInput"
            type="text"
            class="form-control"
            placeholder="Search for a country...."
            aria-label="Username"
            aria-describedby="addon-wrapping"
            @keyup.enter="getDataByCountry(countryInput)"
          />
        </div>
      </div>
      <div class="col-8 cards-listing__dropdown">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by Region
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                @click="getDataByRegion('africa')"
                class="dropdown-item"
                href="#"
                >Africa</a
              >
            </li>
            <li>
              <a
                @click="getDataByRegion('america')"
                class="dropdown-item"
                href="#"
                >America</a
              >
            </li>
            <li>
              <a @click="getDataByRegion('asia')" class="dropdown-item" href="#"
                >Asia</a
              >
            </li>
            <li>
              <a
                @click="getDataByRegion('europe')"
                class="dropdown-item"
                href="#"
                >Europe</a
              >
            </li>
            <li>
              <a
                @click="getDataByRegion('oceania')"
                class="dropdown-item"
                href="#"
                >Oceania</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button
      v-if="isDetails"
      @click="backToAllCountries"
      class="cards-listing__backBtn"
    >
      <img src="../../assets/images/arrow-left.svg" />Back
    </button>
    <div class="row cards-listing__cards">
      <div
        v-for="(item, index) in countriesData"
        :key="index"
        class="col-lg-3 col-md-4 col-12"
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
  </div>
  <div class="loader-container" v-else>
    <img src="../../assets/images/loading-gif.gif" />
  </div>
</template>

<script>
import {
  getAllCountries,
  searchByCountry,
  searchByRegion,
} from "../../services/services.js";
import ListingCard from "../../components/GenericComponents/ListingCards/ListingCard.vue";
export default {
  components: {
    ListingCard,
  },
  data() {
    return {
      countriesData: [],
      countryInput: "",
      isLoading: true,
      isDetails: false,
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
            console.log("error");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDataByCountry(country) {
      this.isDetails = true;
      this.isLoading = true;
      searchByCountry(
        "https://restcountries.com/v3.1/name",
        country,
        (res) => {
          this.countriesData = JSON.parse(JSON.stringify(res.data));
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    },
    getDataByRegion(region) {
      this.isDetails = true;
      searchByRegion(
        "https://restcountries.com/v3.1/region",
        region,
        (res) => {
          this.countriesData = JSON.parse(JSON.stringify(res.data));
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    },
    backToAllCountries() {
      window.location.reload();
    },
  },
  mounted() {
    this.getAllCountriesData();
  },
};
</script>
