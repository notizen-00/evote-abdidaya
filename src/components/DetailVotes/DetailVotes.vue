<template>
    <v-card class="w-screen" max-height="400">
      <v-img
        class="text-white"
        height="200"
        type="image/webp"
        :src="'https://form.apps.unej.ac.id/' + getDetail.thumbnail[0].path"
        cover
        style="position: relative; z-index: 1;"
      >
        <div class="overlay "></div>
        <v-card-subtitle class="absolute top-1 -left-2  rounded-xl text-white z-10">
         
            <v-btn variant="text" size="xsmall" class="z-10" @click="back()" color="black">
                <v-icon size="12" color="white" class="mr-1 pl-2" icon="fa-solid fa-arrow-left"></v-icon> 
                <span class="text-white font-bold text-xs ml-2 mr-2 text-capitalize">Beranda</span>
            </v-btn>
        </v-card-subtitle>
      </v-img>
    </v-card>
  </template>
  
<script setup>
import {ref,inject} from 'vue'
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router';
const store = inject('store')
const router = useRouter()
const {getDetail} = storeToRefs(store.voteStore)

const back = () =>{
    router.push('/vote')
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
}
</style>