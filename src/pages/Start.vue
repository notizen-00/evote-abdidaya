<template>
    <div>

       
            <v-sheet
              v-if="model == 0"
              height="600"
            
            >
              <div class="d-flex mt-20 align-center justify-center">
                <v-img
                :src="Section1"
                width="200"
                height="200"
                >
                </v-img>
              </div>
              <div class="d-flext text-center align-center mt-20 justify-center">
                <p class="text-large font-mono font-bold">Abdidaya Ormawa <br>Universitas Jember</p>
                
              </div>
              <div class="d-flext w-2/3 mx-auto text-center align-center mt-5 justify-center">
                <p class="mt-2 text-xs mx-auto">
                    Aplikasi E-Vote kegiatan Abdidaya Universitas Jember 2023 
                </p>
              </div>
            </v-sheet>
            <v-sheet
            v-if="model == 1"
            height="600"
          
          >
            <div class="d-flex mt-20 align-center justify-center">
              <v-img
              :src="Section2"
              width="200"
              height="200"
              >
              </v-img>
            </div>
            <div class="d-flext text-center align-center mt-20 justify-center">
              <p class="text-large font-mono font-bold">Makanan dan Oleh-oleh </p>
              
            </div>
            <div class="d-flext w-2/3 mx-auto text-center align-center mt-5 justify-center">
              <p class="mt-2 text-xs mx-auto">
                Nikmati masakan terlezat di Jember dan temukan pusat oleh-oleh untuk keluarga di rumah
              </p>
            </div>
          </v-sheet>

         
         

        <v-sheet
        class="d-flex justify-center w-full"
        elevation="0"
        >
        <!-- <v-btn
        class=""
        variant="text"
        @click="model = 2"
        :disabled="model == 2"
        > -->
            <!-- <span class="text-xs text-capitalize">Lewati</span> -->
        <!-- </v-btn> -->
        
        <!-- <v-slide-group
          v-model="model"
          class="w-1/2 ml-10"
          mandatory
          selected-class="bg-info"
          show-arrows
          rounded="xl"
        >
        <v-slide-group-item
            v-for="n in 2"
            :key="n"
            v-slot="{ isSelected, toggle, selectedClass }"
          >
            
            <v-card
              color="grey-lighten-1"
              rounded="xl"
              :class="['ma-3', selectedClass]"
              height="10"
              width="15"
              @click="toggle"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon
                    v-if="isSelected"
                    color="white"
                    size="48"
                    icon="mdi-close-circle-outline"
                  ></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group> -->

      
        <v-btn
        class=""
        color="blue"
        append-icon="fas fa-arrow-right"
        size="large"
        @click="toggleModel"
        >
            Mulai Vote
        </v-btn>
      
       
      </v-sheet>
    </div>
        
</template>
<script setup>


import { storeToRefs } from 'pinia';
import { Device } from '@capacitor/device';
import { ref,onMounted,inject } from 'vue';
import { useRouter } from 'vue-router';

const model = ref(0);
const router = useRouter();
const store = inject('store')

const toggleModel = () => {

    logDeviceInfo();

  if (model.value === 0) {
    router.push('/device');
  
  } else {
    model.value++;
  }
};
const logDeviceInfo = async () => {
  const info = await Device.getInfo();
  const id = await Device.getId();
 
  store.voteStore.setDeviceId(id.identifier);

};
onMounted(async()=>{
    logDeviceInfo()
   


})


</script>