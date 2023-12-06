<template>
    <v-layout>
      <v-app-bar title="Vote Qr">
       
      </v-app-bar>
  
      <v-main >
        <slot name="content">

        </slot>
      </v-main>
    
    </v-layout>

  </template>

  <script setup>
  import BottomBar from '@/layout/partial/BottomBar.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const back = () =>{
     router.push('/')
  }


  </script>