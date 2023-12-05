<template>

    <v-card variant="tonal" class="mx-auto mt-5 rounded-xl" max-width="380" v-for="item in getList" :key="item">
        <v-skeleton-loader   v-if="loading" type="card"></v-skeleton-loader>
        <div v-else>
        <v-img class="align-end text-white" max-height="300" type="image/webp" :src="'https://form.apps.unej.ac.id/'+item.thumbnail[0].path" cover>
    
            <v-card-subtitle class="absolute top-0 left-0 rounded-xl bg-black">
                <span class="text-xs text-white font-bold">
                    <v-icon size="12" class="mr-1">fas fa-location-dot</v-icon>
                    {{ item.lokasi }}
                </span>
            </v-card-subtitle>
        </v-img>
        <div class="text-lg pl-2 opacity-100 bg-black w-screen font-bold text-white">
            {{ item.judul_vote }}
        </div>
        <v-card-actions class="bg-info h-14">
            
            <div class="d-flex justify-content-between w-full">
                <div class="ml-3">
                    <span class="text-slate-300 text-xs">
                        <v-icon class="mr-1" size="15">fa-light fa-calendar-alt</v-icon> {{ item.tanggal_vote}}
                    </span><br>
                    <span class="text-slate-100 text-md">
                        <v-icon class="mr-1 " size="15">fa-light fa-link</v-icon> {{ item.vote_id.length }} <small>votes</small>
                    </span>
                </div>
                <v-btn variant="outlined" @click="detailVotes(item.Id)" class="ml-auto mt-2 pr-3 text-capitalize"
                    :append-icon="item.type != 'qrcode' ? 'fas fa-check-to-slot' : 'fas fa-qrcode'" color="white">
                    Vote
                </v-btn>
            </div>
        </v-card-actions>
     </div>
    </v-card>
</template>
<script setup>
    import {
        ref,
        inject,
        onMounted
    } from 'vue'

    import axios from 'axios'
    import {
        storeToRefs
    } from 'pinia';
    import { useRouter } from 'vue-router';
    const store = inject('store')
    const router = useRouter();
    const {
        getList
    } = storeToRefs(store.voteStore)
    const loading  = ref(true)

    const fetch = async(value) => {

     const response =  await axios.get('https://form.apps.unej.ac.id/download/noco/voting-apps/jenis_vote/thumbnail/9MPydzWdkgipknX_Lk.jpg', {
                headers: {
                    'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn',
                },
            })

    return response.data;

    }

    const detailVotes = async(id) => {
            store.voteStore.fetchDetail(id)

            router.push('/detail-vote')

    }
    onMounted(() => {
        store.voteStore.fetchList()

        setTimeout(() => {
                loading.value = false
        }, 500);
    })
</script>