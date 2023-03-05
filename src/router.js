import { createRouter, createWebHistory } from "vue-router";
import MapView from "./views/MapView/MapView.vue";
import NotFound from "./components/GenericComponents/NotFound/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/countries" },
    { path: "/countries", component: MapView },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
