<template>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation v-model="nav" class="relative -z-10 bg-blue" color="white">
    
        <v-btn @click="store.voteStore.doVote()"  block  class="rounded-xl w-full"  transform="translate(-50%, -50%)">
          <v-icon size="35" class="">fa-light fa-check-to-slot</v-icon>
          Konfirmasi Vote 
        </v-btn>
  
    
      </v-bottom-navigation>
    </v-layout>
  </template>
  
  <script setup>
  import {ref,inject} from 'vue'
  import { storeToRefs } from 'pinia';
  const store = inject('store')

  const nav = ref(1)

  </script>
  