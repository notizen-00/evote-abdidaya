<template>
    <div>
        <v-container class="bg-white opacity-20 test  h-56" :class="{ 'barcode-scanner-active': isScanning }">
            {{ barcodee }}
            <div class="text-h5 text-slate-900 text-center h-screen mt-20 mx-auto w-full"> Scan untuk vote <br>
                <v-icon icon="fas fa-qrcode"></v-icon>
            </div>
            
        </v-container>

        <v-container class="bg-white opacity-20 test mt-56 h-screen" :class="{ 'barcode-scanner-active': isScanning }">
            
        </v-container>

        <v-btn icon="fas fa-flashlight" class="w-full bottom-20 right-4 fixed" position="absolute" @click="toggleTorch"></v-btn>
        
        <!-- <button @click="stopScan">Stop Scan</button>  -->
    </div>
    <v-layout class="overflow-visible" style="height: 56px;">
        <v-bottom-navigation v-model="value" class="relative -z-10 bg-blue" color="red">
      
          <v-btn @click="promptStartScan" variant="filled" block  class="rounded-xl w-full"  transform="translate(-50%, -50%)">
            <v-icon size="35" class="">fa-light fa-check-to-slot</v-icon>
            Konfirmasi Vote 
          </v-btn>
    
      
        </v-bottom-navigation>
      </v-layout>
    <!-- <div class="h-screen relative d-flex justify-end" style="height:100%;">
       
    </div> -->
</template>

<script setup>
    import {
        ref,
        onMounted,
        onBeforeUnmount
    } from 'vue';
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    import {
        BarcodeScanner,
        BarcodeFormat,
        LensFacing,
    } from '@capacitor-mlkit/barcode-scanning';

    const isScanning = ref(false);
    const barcodee = ref('');
    const router = useRouter();
    const shouldStopScan = ref(false);
    const toggleTorch = async () => {
  await BarcodeScanner.toggleTorch();
};
    const promptStartScan = async () => {
        shouldStopScan.value = false; // Reset the flag before starting a new scan

        const userConfirmed = window.confirm('Apakah yakin ingin vote, jatah vote 1 kali ?');

        if (userConfirmed) {
            isScanning.value = true;

            const listener = await BarcodeScanner.addListener(
                'barcodeScanned',
                async result => {
                    isScanning.value = false
                    await BarcodeScanner.removeAllListeners();
                    await BarcodeScanner.stopScan();

                    barcodee.value = result.barcode.displayValue;

                    if (result.barcode.displayValue !== 'kendokenceng') {
                        alert('QR tidak valid, silahkan beri yang valid');
                        isScanning.value = false
                        await BarcodeScanner.removeAllListeners();
                        await BarcodeScanner.stopScan();

                    } else {
                        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/vote';
                        const data = {
                            // Your data to be sent in the POST request body
                            deviceid: 123,
                            vote: 1,
                            namabooth: 'kendokenceng'

                        };

                        const config = {
                            headers: {
                                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                                'Content-Type': 'application/json', 
                            },
                        };
                        try {
                            const response = await axios.post(url, data, config);
                            console.log('POST request successful:', response.data);
                            alert('terima kasih telah vote KendoKenceng')
                            router.push('/')
                            // Handle the response as needed
                        } catch (error) {
                            console.error('Error making POST request:', error);
                            alert(error.message)
                            // Handle the error as needed
                        }
                        // alert('Link Anda valid');

                        // Additional logic for a valid QR code, if needed
                    }
                },
            );

            await BarcodeScanner.startScan();
        }
    };

    const stopScan = async () => {
        isScanning.value = false;
        await BarcodeScanner.removeAllListeners();
        await BarcodeScanner.stopScan();
    };

    // onMounted(()=>{
    //     promptStartScan();
    // })

    onBeforeUnmount(()=>{
        stopScan();
    })
</script>

<style scoped>
    body.barcode-scanner-active {
        visibility: hidden;
        
    }

    .barcode-scanner-modal {
        visibility: visible;
    }
</style>