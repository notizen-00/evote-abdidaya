<template>
     <v-card variant="tonal" color="info" max-width="280" class="mx-auto">
        <v-card-text class="text-center">

            <v-icon class="">fa-duotone fa-mobile</v-icon> <span class="text-capitalize">{{ device.manufacturer }}</span> -- {{ device.model }}
        </v-card-text>
        <v-card-text class="text-center">
            {{ deviceId.identifier }}
        </v-card-text>
        <v-divider thickness="3" class="border-opacity-75 border-blue-400"></v-divider>
        <v-card-actions>
            <v-btn variant="tonal">Test</v-btn>
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