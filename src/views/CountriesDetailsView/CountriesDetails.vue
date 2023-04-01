<template>
  <div v-if="!isLoading && showDetails && !isError" class="cards-details">
    <a @click="hidePopUpDetails" class="cards-details-backBtn">
      <ion-icon name="close-circle-outline"></ion-icon>
    </a>
    <div class="cards-details-container">
      <div class="cards-details-container__img">
        <img
          @error="onErrorImg"
          class="cards-details__img"
          :src="renderedObject.flagUrl"
        />
      </div>
      <div class="cards-details-container__data">
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
              <button @click="getCountriesDetailsByCode(item.code)">
                {{ item.name }}
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
import data from "./data.json";
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
  props: ["countryData"],
  methods: {
    getCountriesDetailsByCode(countryCode) {
      this.isLoading = true;
      searchByCode(
        "https://restcountries.com/v3.1/alpha",
        countryCode,
        (res) => {
          if (res.status == 200) {
            this.countryDetails = JSON.parse(JSON.stringify(res.data))[0];
            this.handleReneredObject(this.countryDetails);
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
    handleReneredObject(country) {
      this.countryDetails = JSON.parse(JSON.stringify(country));
      this.renderedObject = {
        nativeName: this.countryDetails.name.common,
        population: this.countryDetails.population,
        region: this.countryDetails.region,
        subRegion: this.countryDetails.subregion
          ? this.countryDetails.subregion
          : "-",
        capital: this.countryDetails.capital
          ? this.countryDetails.capital[0]
          : "-",
        startOfWeek: this.countryDetails.startOfWeek,
        flagUrl: this.countryDetails.flags.png,
        borderCountries: this.countryDetails.borders,
      };
      this.getCountryLanguages(this.countryDetails.languages);
      this.getCountryCurrencies(this.countryDetails.currencies);
      this.getBorderCountries(this.countryDetails.borders);
      this.isLoading = false;
    },
    getCountryLanguages(languages) {
      if (languages) {
        const langArray = [];
        for (const [, value] of Object.entries(languages)) {
          langArray.push(value);
        }
        this.renderedObject.languages = langArray.join(", ");
      } else {
        this.renderedObject.languages = "-";
      }
    },
    getCountryCurrencies(currency) {
      if (currency) {
        const currencyArray = [];
        for (const [, value] of Object.entries(currency)) {
          currencyArray.push(value.name);
        }
        this.renderedObject.currencies = currencyArray.join(", ");
      } else {
        this.renderedObject.currencies = "-";
      }
    },
    // to convert country code to country name to be rendered
    getBorderCountries(borders) {
      if (borders) {
        const borderCountriesName = [];
        borders.map((border) => {
          const borderCountryName = data.filter((country) => {
            return country.alpha3Code == border;
          });
          borderCountriesName.push({
            name: borderCountryName[0].name,
            code: border,
          });
          this.renderedObject.borderCountries = borderCountriesName;
        });
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
    this.handleReneredObject(this.countryData[0]);
  },
};
</script>
