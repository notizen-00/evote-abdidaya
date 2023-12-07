<template>
  <div>
    <div class="map mt-8 relative" ref="mapDivRef"></div>
    <div :key="componentKey" class="relative -mt-20 w-full mb-5 d-flex justify-end">
      <v-btn color="black" @click="store.mapStore.getWatchPosition()" class="mr-5 w-full" icon="fas fa-location-crosshairs"></v-btn>
      <v-btn color="black" @click="checkLocationWithinRadius(getLocation, 550)" class="mr-5 w-full" icon="fas fa-location-question"></v-btn>
    </div>
    <div class="mt-20">
      <v-sheet
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 text-center mx-auto"
      >
        <h2 class="text-h5 mb-6"></h2>
        <p class="mb-4 text-medium-emphasis text-body-2">
          Pastikan anda berada di lingkungan Universitas Jember sebelum melakukan voting.
        </p>
        <v-divider class="mb-4"></v-divider>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const store = inject('store');
const router = useRouter()
const { getLocation } = storeToRefs(store.mapStore)
const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

const zoom = 14;
const mapType = "roadmap";
const disableUI = false;

const map = ref(null);
const mapDivRef = ref(null);
const marker = ref(null);
const circle = ref(null);
const lokasi_unej = ref({ lat: -8.1642276, lng: 113.7170735 });

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const checkLocationWithinRadius = async (currentLocation, radiuss) => {
  const { lat: currentLat, lng: currentLng } = currentLocation;
  const { lat: circleLat, lng: circleLng } = lokasi_unej.value;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(circleLat - currentLat);
  const dLon = deg2rad(circleLng - currentLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(currentLat)) * Math.cos(deg2rad(circleLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  if (distance <= radiuss / 1000) {
    console.log("You are within the radius");
    alert('lokasi anda valid')
    router.push('/device')
  } else {
    alert('lokasi anda di luar jangkauan')
    forceRerender();
    await nextTick();
    router.push('/device')
    console.log("You are outside the radius");
  }

  // Memaksa komponen untuk melakukan render ulang
  // Anda harus mengimpor useRoute dan useStore dari vue-router dan pinia
  // Jika belum diimpor
  useRoute().forceUpdate();
  useStore().forceUpdate();
};

onMounted(async () => {
  store.mapStore.setGeolocation();

  const key = import.meta.env.VITE_APP_GOOGLEMAPS_KEY;
  const googleMapScript = document.createElement("SCRIPT");
  googleMapScript.setAttribute(
    "src",
    `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
  );
  googleMapScript.setAttribute("defer", "");
  googleMapScript.setAttribute("async", "");
  document.head.appendChild(googleMapScript);

  try {
    await nextTick(); // Menunggu hingga siklus render berikutnya
    window.initMap = () => {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: mapType,
        zoom: zoom,
        disableDefaultUI: true,
        center: getLocation.value,
        mapTypeControl: false,
      });

      marker.value = new window.google.maps.Marker({
        position: getLocation.value,
        map: map.value,
        title: "ini lokasiku",
      });

      circle.value = new window.google.maps.Circle({
        strokeColor: "#3af25f",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#3af25f",
        fillOpacity: 0.35,
        map: map.value,
        center: lokasi_unej.value,
        radius: 550,
      });
    };
  } catch (e) {
    alert(e.message)
  }
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
  background-color: azure;
}
</style>
