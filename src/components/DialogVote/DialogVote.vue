<template>
    <v-row justify="center">
      <v-dialog
        v-model="isDialogActive"
        persistent
        width="full"
      >
        <v-card>
          <!-- <v-card-title class="text-h6"> -->
   
            <div class="w-full d-flex justify-between">
            <span class="text-slate-500 text-h6 ml-3">Data Nominasi</span>
            <v-btn
            color="pink"
            class="mr-3 mt-2"
            size="x-small"
            variant="outlined"
            icon="fas fa-close"
            @click="store.voteStore.toggleDialog()"
          >
          </v-btn>
        </div>

        <!-- {{ getDetailNominasi }} -->

            <v-chip color="blue" class="w-10/12 ml-2 mt-10 mx-auto"><v-icon class="fas fa-building-columns mr-3" size="15"></v-icon>{{ getDetailNominasi.NamaPT }}</v-chip>
            <span class="text-slate-500 text-sm text-center m-3 pt-5">" {{ getDetailNominasi.JudulProposal }} "</span>        
   
        
          <br>
       
          
          <v-card-actions class="mt-10 mx-auto">
            <v-spacer></v-spacer>
        
            <v-btn
              color="green"
              class="px-5"
              variant="flat"
              prepend-icon="fas fa-check"
              @click="store.voteStore.doVote()"
            >
              Vote
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

  <script setup>
    import {inject} from 'vue'
    import { storeToRefs } from 'pinia';

    const store = inject('store')

    const { getDetailNominasi,isDialogActive } = storeToRefs(store.voteStore);


  </script>