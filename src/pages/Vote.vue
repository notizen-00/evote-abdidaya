<script setup>
import DetailLayout from '@/layout/DetailLayout.vue'
import ApplicationLayout from '@/layout/ApplicationLayout.vue'
import HelloWorld from '../components/HelloWorld.vue';
import Scanner from '../components/Scanner.vue';
import {ref,inject,onBeforeUnmount} from 'vue'
import {storeToRefs} from 'pinia'
import DetailVotes from '@/components/DetailVotes/DetailVotes.vue';

const store = inject('store')

const {getDetail} = storeToRefs(store.voteStore)

onBeforeUnmount(() => {
    store.voteStore.destroyDetail();
})

</script>

<template>


  <DetailLayout v-if="getDetail.type == 'default'">
    <template #content>

      <!-- <Scanner></Scanner> -->
        <DetailVotes v-if="getDetail.type =='default'"></DetailVotes>
      {{ 
        getDetail.type
      }}
        
    
    </template>
  </DetailLayout>

  <ApplicationLayout v-if="getDetail.type =='qrcode' ">
    <template #content>
        <Scanner v-if="getDetail.type == 'qrcode'"></Scanner>

    </template>  
  </ApplicationLayout>
  

 
</template>
