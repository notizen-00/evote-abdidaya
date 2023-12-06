<script setup>
import ApplicationLayout from '../layout/ApplicationLayout.vue'
import HelloWorld from '../components/HelloWorld.vue';
import ListVote from '@/components/ListVote/ListVote.vue';
import {
    ref,
    onMounted,
    inject
}from 'vue'
const store = inject('store')

onMounted(()=>{

    store.mapStore.setGeolocation()

})
</script>

<template>
  <ApplicationLayout>
    <template #content>
        <v-container>
            <h3 class="text-h6 text-center">Daftar Voting</h3>
            <v-divider thickness="8" color="success" class="border-blue-600 border-opacity-90"></v-divider>
        </v-container>
        <ListVote class="mt-10"></ListVote>
    
    </template>
  </ApplicationLayout> 
</template>
