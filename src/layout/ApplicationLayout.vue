<template>
    <v-layout>
      <v-app-bar title="Voting Abdidaya Ormawa 2023"></v-app-bar>
  
      <v-main >
        <slot name="content">

        </slot>
      </v-main>
    
    </v-layout>
    <BottomBar></BottomBar>
  </template>

  <script setup>
  import BottomBar from '@/layout/partial/BottomBar.vue';
  </script>