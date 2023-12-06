<template>
     <v-card variant="tonal" color="info" class="mx-auto">
        <v-card-text class="text-center">

            <v-icon class="">fa-duotone fa-mobile</v-icon> <span class="text-capitalize">{{ device.manufacturer }}</span> -- {{ device.model }}
        </v-card-text>
        <v-card-text class="text-center">
            Unique ID : {{ deviceId.identifier }}
        </v-card-text>
        <v-divider thickness="3" class="border-opacity-75 border-blue-400"></v-divider>
        <v-card-actions class="d-flex justify-between">
            <v-chip color="green" variant="tonal">Jatah Voting : 3</v-chip>
            
            <v-chip color="green" variant="tonal">Terpakai : 0</v-chip>
        </v-card-actions>
      
     </v-card>
</template>
<script setup>
import { Device } from '@capacitor/device';
import {ref,onMounted,inject} from 'vue'
import {storeToRefs} from 'pinia'

const store = inject('store')

const { getLocation } = storeToRefs(store.mapStore)

const device = ref('')
const deviceId = ref('')
const logDeviceInfo = async () => {
  const info = await Device.getInfo();
  const id = await Device.getId();

  device.value = info
 deviceId.value = id
  console.log(info);
};

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};

onMounted(() => {
        logBatteryInfo();
        logDeviceInfo();
})
</script>