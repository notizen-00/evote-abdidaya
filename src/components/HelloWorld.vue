<template>
  <div>

    <!-- <button @click="checkMock([])">Check without Whitelist</button> -->
  </div>
</template>

<script setup>
import { MockLocationChecker } from 'capacitor-mock-location-checker';
import {onMounted} from 'vue'
import { Toast } from '@capacitor/toast';
import { useRouter } from 'vue-router';

const router = useRouter();
const checkMock = async (whiteList) => {
  try {
    const checkResult = await MockLocationChecker.checkMock({ whiteList });

    if (checkResult.isMock) {
     
      await Toast.show({
        text: 'Perangkat Anda terdeteksi fake gps'
      });

      router.push('/')
    } else {
      await Toast.show({
        text: 'Fake Gps Checker System : Device Anda aman '
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
