<template>
  <div v-if="!isLoading && showDetails && !isError" class="cards-details">
    <a @click="hidePopUpDetails" class="cards-details-backBtn">
      <ion-icon name="close-circle-outline"></ion-icon>
    </a>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-12">
        <img
          @error="onErrorImg"
          class="cards-details__img"
          :src="renderedObject.flagUrl"
        />
      </div>
      <div class="col-lg-6 col-md-6 col-12">
        <div class="row">
          <h2 class="cards-details__title">{{ renderedObject.nativeName }}</h2>
          <div class="col-lg-6 col-md-12 col-12">
            <ul class="cards-details__data">
              <li>
                Native Name:<span>{{ renderedObject.nativeName }}</span>
              </li>
              <li>
                Population:<span>{{ renderedObject.population }}</span>
              </li>
              <li>
                Region:<span>{{ renderedObject.region }}</span>
              </li>
              <li>
                Sub Region:<span>{{ renderedObject.subRegion }}</span>
              </li>
              <li>
                Capital:<span>{{ renderedObject.capital }}</span>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <ul class="cards-details__data">
              <li>
                Currencies:<span>{{ renderedObject.currencies }}</span>
              </li>
              <li>
                Languages:<span>{{ renderedObject.languages }}</span>
              </li>
              <li>
                Start of week:<span>{{ renderedObject.startOfWeek }}</span>
              </li>
            </ul>
          </div>
          <div
            v-if="renderedObject.borderCountries"
            class="col-12 cards-details__related-data"
          >
            <p>Border Countries:</p>
            <div
              v-for="(item, index) in renderedObject.borderCountries"
              :key="index"
              class="cards-details__related-data-btn"
            >
              <button @click="getCountriesDetailsByCode(item)">
                {{ item }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="loader-container">
    <img src="../../assets/images/loading-gif.gif" />
  </div>
  <error-page v-if="isError"></error-page>
</template>

<script>
import { searchByCode } from "../../services/services.js";
import defaultImage from "../../assets/images/brokenImg.svg";
import ErrorPage from "@/components/GenericComponents/ErrorPage/ErrorPage.vue";
export default {
  data() {
    return {
      countryDetails: {},
      renderedObject: {},
      isLoading: true,
      showDetails: true,
      isError: false,
    };
  },
  emits: ["hidePopup"],
  components: {
    ErrorPage,
  },
  props: ["countryData", "allCountriesData"],
  methods: {
    getCountriesDetailsByCode(countryCode) {
      searchByCode(
        "https://restcountries.com/v3.1/alpha",
        countryCode,
        (res) => {
          if (res.status == 200) {
            this.countryDetails = JSON.parse(JSON.stringify(res.data))[0];
            this.renderedObject = {
              nativeName: this.countryDetails.name.common,
              population: this.countryDetails.population,
              region: this.countryDetails.region,
              subRegion: this.countryDetails.subregion,
              capital: this.countryDetails.capital[0],
              currencies: this.countryDetails.currencies,
              languages: "",
              startOfWeek: this.countryDetails.startOfWeek,
              flagUrl: this.countryDetails.flags.png,
              borderCountries: this.countryDetails.borders,
            };
            this.getCountryLanguages(this.countryDetails.languages);
            this.getCountryCurrencies(this.countryDetails.currencies);
            this.isLoading = false;
          } else {
            this.isError = true;
            this.isLoading = false;
          }
        },
        () => {
          this.isLoading = false;
          this.isError = true;
        }
      );
    },
    handleReneredObject() {
      this.countryDetails = JSON.parse(JSON.stringify(this.countryData[0]));
      this.renderedObject = {
        nativeName: this.countryDetails.name.common,
        population: this.countryDetails.population,
        region: this.countryDetails.region,
        subRegion: this.countryDetails.subregion,
        capital: this.countryDetails.capital[0],
        currencies: this.countryDetails.currencies,
        languages: "",
        startOfWeek: this.countryDetails.startOfWeek,
        flagUrl: this.countryDetails.flags.png,
        borderCountries: this.countryDetails.borders,
      };
      this.getCountryLanguages(this.countryDetails.languages);
      this.getCountryCurrencies(this.countryDetails.currencies);
      this.isLoading = false;
    },
    getCountryLanguages(languages) {
      for (const [, value] of Object.entries(languages)) {
        this.renderedObject.languages = value;
      }
    },
    getCountryCurrencies(currency) {
      for (const [, value] of Object.entries(currency)) {
        this.renderedObject.currencies = value.name;
      }
    },
    onErrorImg(e) {
      e.target.src = defaultImage;
    },
    hidePopUpDetails() {
      this.$emit("hidePopup", false);
    },
  },
  mounted() {
    this.handleReneredObject();
  },
};
</script>
