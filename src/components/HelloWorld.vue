<template>
  <div>

    <!-- <button @click="checkMock([])">Check without Whitelist</button> -->
  </div>
</template>

<script setup>
import { MockLocationChecker } from 'capacitor-mock-location-checker';
import {onMounted} from 'vue'
import { Toast } from '@capacitor/toast';
const checkMock = async (whiteList) => {
  try {
    const checkResult = await MockLocationChecker.checkMock({ whiteList });

    if (checkResult.isMock) {
     
      await Toast.show({
        text: 'Perangkat Anda terdeteksi fake gps'
      });
    } else {
      await Toast.show({
        text: 'Perangkat Anda aman , silahkan melakukan voting'
      });
     
    }

    if (checkResult.indicated != null && checkResult.indicated.length > 0) {
      await MockLocationChecker.goToMockLocationAppDetail({ packageName: checkResult.indicated[0] });
    }
  } catch (error) {
    console.error('Error checking mock location:', error);
    alert(error);
  }
};

onMounted(() => {
  checkMock(['com.transsion.fmradio', 'com.reallytek.wg'])
})

</script>

<style scoped>
/* Your component-specific styles go here */
</style>
