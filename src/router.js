import { createRouter, createWebHistory } from "vue-router";
import CountriesListing from "./views/CountriesListingView/CountriesListing.vue";
import NotFound from "./components/GenericComponents/NotFound/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/countries" },
    { path: "/countries", component: CountriesListing },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
