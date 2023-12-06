<template>
    <div>
      <!-- {{ getDetail }} -->

      <v-text-field
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
    ></v-text-field>
        <div class="mx-auto text-center w-full">
            {{ search }}
        </div>
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
  const store = inject('store');
  const { getDetail,getNominasiId,getPt,getOrmawa } = storeToRefs(store.voteStore);
  const isActive = ref(null);
  const imagePaths = ref({});
  const search = ref('')

 
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
  