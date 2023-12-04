<script setup>
import ApplicationLayout from './layout/ApplicationLayout.vue'
import HelloWorld from './components/HelloWorld.vue';
import Scanner from './components/Scanner.vue';
</script>

<template>
  <ApplicationLayout>
    <template #content>
      <Scanner></Scanner>
      
    
    </template>
  </ApplicationLayout>
  <HelloWorld></HelloWorld>
 
</template>

