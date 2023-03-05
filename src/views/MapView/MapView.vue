<template>
  <div class="container-fluid IpSearch">
    <Header @ip="getIpData($event)"></Header>
    <div class="row">
      <div v-if="!isLoading" class="col-12 IpSearch__map-container">
        <DataCard
          :ipAddress="ipData.ip"
          :location="ipData.location.city"
          :timeZone="ipData.location.timezone"
          :isp="ipData.isp"
        ></DataCard>
        <MapComponent :center="ipData.location"></MapComponent>
      </div>
      <div class="loader-container" v-else>
        <img src="../../assets/images/loading-gif.gif" />
      </div>
    </div>
  </div>
</template>

<script>
import DataCard from "../../components/GenericComponents/DataCard/DataCard.vue";
import Header from "../../components/Layout/HeaderCompnent.vue";
import MapComponent from "../../components/MapComponent/MapComponent.vue";
import {
  getIpAddressData,
  getCurrentIpAddress,
} from "../../services/services.js";
export default {
  components: { DataCard, Header, MapComponent },
  data() {
    return {
      ipData: {
        ip: "",
        location: "",
        timezone: "",
        isp: "",
      },
      currentIp: "",
      isLoading: true,
    };
  },
  methods: {
    getIpData(ip) {
      this.currentIp = ip;
      getIpAddressData(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_zgeR35LvamY6wa5Dt9IhVzlREy1Fs&ipAddress=${this.currentIp}`,
        (res) => {
          if (res.status == 200) {
            this.isLoading = false;
            this.ipData = {
              ip: res.data.ip,
              location: res.data.location,
              timezone: res.data.location.timezone,
              isp: res.data.isp,
            };
          } else {
            this.isLoading = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    getCurrentIpAddress(
      "https://api64.ipify.org/?format=json",
      (res) => {
        this.currentIp = res.data.ip;
      },
      (err) => {
        console.log(err);
      }
    );
    this.getIpData(this.currentIp);
  },
};
</script>
