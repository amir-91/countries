<template>
  <router-link :to="detailsLink">
    <div class="listing-card">
      <div class="listing-card__img">
        <img @error="onErrorImg" :src="flag" />
      </div>
      <div class="listing-card__body">
        <h2 :title="name">{{ name }}</h2>
        <ul>
          <li>
            Population:<span>{{ population }}</span>
          </li>
          <li>
            Region:<span>{{ region }}</span>
          </li>
          <li>
            Capital:<span>{{ capital ? capital[0] : "-" }}</span>
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
import defaultImage from "../../../assets/images/brokenImg.svg";
export default {
  props: ["region", "population", "capital", "name", "flag"],
  methods: {
    onErrorImg(e) {
      e.target.src = defaultImage;
    },
  },
  computed: {
    detailsLink() {
      return this.$route.path + "/" + this.name;
    },
  },
};
</script>
