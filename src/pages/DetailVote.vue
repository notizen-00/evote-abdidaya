<script setup>
import DetailLayout from '@/layout/DetailLayout.vue'
import ApplicationLayout from '@/layout/ApplicationLayout.vue'
import Default from '@/pages/detail/Default.vue';
import Qrcode from '@/pages/detail/Qrcode.vue';
import Scanner from '../components/Scanner.vue';
import {ref,inject,onBeforeUnmount} from 'vue'
import {storeToRefs} from 'pinia'
import DetailVotes from '@/components/DetailVotes/DetailVotes.vue';
import HelloWorld from '@/components/HelloWorld.vue';

const store = inject('store')

const {getDetail} = storeToRefs(store.voteStore)

onBeforeUnmount(() => {
    store.voteStore.destroyDetail();
})

</script>

<template>


  <Default v-if="getDetail.type == 'list'"></Default>

  <Qrcode v-if="getDetail.type == 'qrcode'"></Qrcode>
  
  <HelloWorld></HelloWorld>
 
</template>
