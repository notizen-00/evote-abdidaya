<template>
    <ApplicationLayout>
        <template #content>
            <Scanner></Scanner>
    
        </template>  
      </ApplicationLayout>
</template>
<script setup>
import DetailLayout from '@/layout/DetailLayout.vue'
import ApplicationLayout from '@/layout/BlankLayout.vue'
import Scanner from '@/components/Scanner.vue';
import {ref,inject,onBeforeUnmount} from 'vue'
import {storeToRefs} from 'pinia'
import DetailVotes from '@/components/DetailVotes/DetailVotes.vue';

const store = inject('store')

const {getDetail} = storeToRefs(store.voteStore)
</script>

