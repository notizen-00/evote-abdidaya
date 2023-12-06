<script setup>
import DetailLayout from '@/layout/DetailLayout.vue'
import {ref,inject,onBeforeUnmount} from 'vue'
import {storeToRefs} from 'pinia'
import DetailVotes from '@/components/DetailVotes/DetailVotes.vue';
import ListNominasi from '@/components/listNominasi/ListNominasi.vue';
import BottomBar from '@/layout/partial/DetailBottomBar.vue';
import DialogVote from '@/components/DialogVote/DialogVote.vue';
const store = inject('store')

const {getDetail} = storeToRefs(store.voteStore)

onBeforeUnmount(() => {
    store.voteStore.destroyDetail();
})

</script>

<template>


  <DetailLayout >
    <template #content>

        <DetailVotes></DetailVotes>
        <div class="mx-auto w-full text-center text-xs mt-4 text-slate-500"><v-icon size="10" class="fas fa-link mr-2"></v-icon>Total Votes</div>
        <div class="mx-auto w-full text-center text-h3 font-serif mb-1 text-blue-500">{{ getDetail.vote_id.length }}</div>
        <div class="mx-auto w-full text-center text-xs font-serif mb-5 text-black"><v-icon size="10" class="fa-light fa-clock mr-2"> </v-icon>voting di tutup pada {{ getDetail.tanggal_vote }} </div>

        <ListNominasi></ListNominasi>
        <DialogVote></DialogVote>
    </template>
  
  </DetailLayout>
  <BottomBar></BottomBar>

 
</template>
