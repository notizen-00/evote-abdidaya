<template>
    <v-layout>
      
      <v-main class="">
        <slot name="content">

        </slot>
      </v-main>
    
    </v-layout>
  
  </template>

  <script setup>
  import BottomBar from '@/layout/partial/DetailBottomBar.vue';
  </script>