<template>
  <div>
    <v-btn @click="checkMock(['com.transsion.fmradio', 'com.reallytek.wg'])">Check Mock</v-btn>
    <!-- <button @click="checkMock([])">Check without Whitelist</button> -->
  </div>
</template>

<script setup>
import { MockLocationChecker } from 'capacitor-mock-location-checker';

const checkMock = async (whiteList) => {
  try {
    const checkResult = await MockLocationChecker.checkMock({ whiteList });

    if (checkResult.isMock) {
      alert('Perangkat Anda Terdeteksi Fake GPS mohon matikan aplikasi Fake GPS sebelum melakukan voting');
    } else {
      alert('Perangkat Anda aman silahkan melakukan voting');
    }

    console.log('Mock Location Check Result:');
    console.log('Is Mock Location: ', checkResult.isMock);
    console.log('Messages: ', checkResult.messages);
    console.log('Indicated Apps: ', checkResult.indicated.join('\n'));

    // Open Detail First Indicated App
    // if (checkResult.indicated != null && checkResult.indicated.length > 0) {
    //   await MockLocationChecker.goToMockLocationAppDetail({ packageName: checkResult.indicated[0] });
    // }
  } catch (error) {
    console.error('Error checking mock location:', error);
    alert(error);
  }
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
