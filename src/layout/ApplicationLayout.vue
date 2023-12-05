<template>
    <v-layout class="rounded rounded-md">
      <v-app-bar title="E-Voting"></v-app-bar>
  
      <v-main >
        <slot name="content">

        </slot>
      </v-main>
    
    </v-layout>
    <BottomBar></BottomBar>
  </template>

  <script setup>
  import BottomBar from './partial/BottomBar.vue';
  </script>