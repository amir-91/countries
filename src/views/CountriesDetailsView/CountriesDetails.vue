<template>
  <div v-if="!isLoading" class="container cards-details">
    <router-link to="/">
      <button class="cards-details-backBtn">
        <img src="../../assets/images/arrow-left.svg" />Back
      </button>
    </router-link>

    <div class="row">
      <div class="col-lg-6 col-md-6 col-12">
        <img class="cards-details__img" :src="renderedObject.flagUrl" />
      </div>
      <div class="col-lg-6 col-md-6 col-12">
        <div class="row">
          <h2 class="cards-details__title">{{ renderedObject.nativeName }}</h2>
          <div class="col-6">
            <ul class="cards-details__data">
              <li>
                Native Name:<span>{{ renderedObject.nativeName }}</span>
              </li>
              <li>
                Populution:<span>{{ renderedObject.population }}</span>
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
          <div class="col-6">
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
          <div class="col-12 cards-details__related-data">
            <p>Border Countries:</p>
            <span
              v-for="(item, index) in renderedObject.borderCountries"
              :key="index"
            >
              <button @click="goToBorderCountry(item)">{{ item }}</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loader-container" v-else>
    <img src="../../assets/images/loading-gif.gif" />
  </div>
</template>

<script>
import { searchByCountry } from "../../services/services.js";
export default {
  data() {
    return {
      countryDetails: {},
      renderedObject: {},
      isLoading: true,
    };
  },
  methods: {
    getCountriesDetails() {
      let countryName = this.$route.params.country;
      searchByCountry(
        "https://restcountries.com/v3.1/name",
        countryName,
        (res) => {
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
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    },
    goToBorderCountry(country) {
      this.$router.push("/countriesBorders/" + country);
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
  },
  mounted() {
    this.getCountriesDetails();
  },
};
</script>
