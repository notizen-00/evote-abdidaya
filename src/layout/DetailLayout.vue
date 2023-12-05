<template>
    <v-layout class="rounded-md">
      
      <v-main class="">
        <slot name="content">

        </slot>
      </v-main>
    
    </v-layout>
    <BottomBar></BottomBar>
  </template>

  <script setup>
  import BottomBar from '@/layout/partial/DetailBottomBar.vue';
  </script>