<script setup>
import ApplicationLayout from '../layout/ApplicationLayout.vue'
import HelloWorld from '../components/HelloWorld.vue';
import ListVote from '@/components/ListVote/ListVote.vue';
import CardDevice from '@/components/CardDevice/CardDevice.vue';
import {
    ref,
    inject
}from 'vue'
const store = inject('store')

</script>

<template>
  <ApplicationLayout>
    <template #content>
        <v-container>
            <h3 class="text-h6 text-center"> - Device Page -</h3>
            <v-divider thickness="8" color="success" class="border-blue-600 border-opacity-90"></v-divider>
        </v-container>
        
        <CardDevice></CardDevice>
    
    </template>
  </ApplicationLayout>
  <!-- <HelloWorld></HelloWorld> -->
 
</template>
