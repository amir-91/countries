import { createRouter, createWebHistory } from "vue-router";

import CountriesDetails from "./views/CountriesDetailsView/CountriesDetails.vue";
import CountriesListing from "./views/CountriesListingView/CountriesListing.vue";
import CountryBorder from "./views/BorderCountriesView/BorderCountries.vue";
import NotFound from "./components/GenericComponents/NotFound/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/countries" },
    { path: "/countries", component: CountriesListing },
    {
      path: "/countries/:country",
      component: CountriesDetails,
      props: true,
    },
    {
      path: "/countriesBorders/:code",
      component: CountryBorder,
      props: true,
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
