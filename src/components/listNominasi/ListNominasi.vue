<template>
    <div>
      <!-- {{ getDetail }} -->

      <!-- <v-text-field
      v-model="search"
      class="w-10/12 mx-auto"
      rounded="xl"
      density="compact"
      variant="outlined"
      label="Cari Ormawa ......"
      prepend-inner-icon="fa-light fa-magnifying-glass"
      single-line
      hide-details
      @click:append-inner="onClick"
    ></v-text-field> -->
        <!-- <div class="mx-auto text-center w-full">
            {{ search }}
        </div> -->
      <v-card
        v-for="item in getOrmawa"
        :key="item.Id"
        class="mx-auto my-8"
        max-width="344"
        :variant="getNominasiId === item.Id ? 'outlined' :'outlined'"
    
        :color="getNominasiId === item.Id ? 'blue' :''"
        :append-icon="getNominasiId === item.Id ? 'fas fa-square-check green' : 'fa-light fa-square'"
        link
        @click="test(item.Id)"
        rel="noopener"
      >
    <template #title>
        <span class="text-xs">{{ item.Nama }}</span>
    </template>
    
    <template #prepend>
        
        <!-- <v-avatar  max-width="200" max-height="200" v-if="imagePaths[item.Id] " :image="imagePaths[item.Id]" alt="Nominee Image" ></v-avatar> -->
    </template>

   
</v-card>


    </div>
  </template>
  
  <script setup>
  import { ref, inject,onBeforeUnmount,onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  import axios from 'axios'
import { useRouter } from 'vue-router';
  const store = inject('store');
  const router = useRouter();
  const { getDetail,getNominasiId,getPt,getOrmawa } = storeToRefs(store.voteStore);
  const { getLocation } = storeToRefs(store.mapStore)
  const isActive = ref(null);
  const imagePaths = ref({});
  const search = ref('')

  const lokasi_unej = ref({
    lat:-8.1642276,
    lng:113.7170735
})


const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
  const checkLocationWithinRadius = (currentLocation, radiuss) => {
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
  } else {
    alert('lokasi anda di luar area Universitas Jember')
    router.push('/vote')
    console.log("You are outside the radius");
  }
};
  const getImagePath = async(id) =>
  {
    try{
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/list_vote/'+id;
        const url_noco = 'https://form.apps.unej.ac.id/';
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);
        imagePaths.value[id] = url_noco + response.data.foto[0].path;


        // alert(JSON.stringify(response.data.foto[0].path))
    }catch(e){

        alert(e.message)
    }
 
  }
  const test = (id) => {

    store.voteStore.toggleDialog()
    store.voteStore.fetchNominasi(id)
    store.voteStore.setNominasiId(id)
    getNominasiId === id ? store.voteStore.resetNominasiId() : id;


  };

  onMounted(()=>{
    store.voteStore.fetchOrmawa()
    store.voteStore.fetchPt()
    checkLocationWithinRadius(getLocation.value,550)
  })
  onBeforeUnmount(()=>{
    store.voteStore.resetNominasiId()
    store.voteStore.resetVoteId()
  })
  
  </script>
  
  <style>

  .green {
    color: blue;
  }
  </style>
  