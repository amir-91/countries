<template>
  <GoogleMap
    class="IpSearch__map"
    api-key="AIzaSyDYdBtTkh9NUqIRd1XIOznpGxUHahTNT1o"
    style="height: 100%"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  props: ["center"],
  components: {
    GoogleMap,
    Marker,
  },
};
</script>
