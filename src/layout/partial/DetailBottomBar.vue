<template>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation v-model="value" class="relative -z-10 bg-blue" color="red">
    
        <v-btn to="/" variant="filled" block  class="rounded-xl w-full"  transform="translate(-50%, -50%)">
          <v-icon size="35" class="">fa-light fa-check-to-slot</v-icon>
          Konfirmasi Vote 
        </v-btn>
  
    
      </v-bottom-navigation>
    </v-layout>
  </template>
  
  <script>
  export default {
    data: () => ({ value: 2 }),
  };
  </script>
  