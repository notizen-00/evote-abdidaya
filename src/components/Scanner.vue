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

        <v-btn icon="fas fa-arrow-left" class="w-full bottom-20 right-4 fixed" position="absolute" @click="back()">
        </v-btn>
        <v-btn icon="fas fa-flashlight" class="w-full bottom-20 left-4 fixed" position="absolute" @click="toggleTorch">
        </v-btn>

        <!-- <button @click="stopScan">Stop Scan</button>  -->
    </div>

    <!-- <div class="h-screen relative d-flex justify-end" style="height:100%;">
       
    </div> -->
</template>

<script setup>
    import {
        ref,
        onMounted,
        inject,
        onBeforeUnmount
    } from 'vue';
    import axios from 'axios'
    import {
        useRouter
    } from 'vue-router';
    import {
        BarcodeScanner,
        BarcodeFormat,
        LensFacing,
    } from '@capacitor-mlkit/barcode-scanning';
    import {
        storeToRefs
    } from 'pinia';
    const store = inject('store')
    const isScanning = ref(false);
    const barcodee = ref('');
    const router = useRouter();
    const shouldStopScan = ref(false);
    const toggleTorch = async () => {
        await BarcodeScanner.toggleTorch();
    };

    const back = () => {
        stopScan();

        router.push('/beranda')
    }
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

                    if (!Number.isNaN(Number(result.barcode.displayValue))) {
                        const voteNumber = Number(result.barcode.displayValue);
                        if (voteNumber >= 1 && voteNumber <= 238) {
                            // Valid vote number, proceed with the vote

                            store.voteStore.setNominasiId(voteNumber)
                            store.voteStore.doVote();
                        } else {
                            alert('Nomor vote tidak valid');
                            isScanning.value = false
                            await BarcodeScanner.removeAllListeners();
                            await BarcodeScanner.stopScan();

                            router.push('/beranda')
                        }
                    } else {
                        alert('QR tidak valid, silahkan beri yang valid');
                        isScanning.value = false
                        await BarcodeScanner.removeAllListeners();
                        await BarcodeScanner.stopScan();

                        router.push('/beranda')
                    }

                    // Rest of your code...

                },
            );

            await BarcodeScanner.startScan();
        }else{
            router.push('/vote')
        }
    };

    const stopScan = async () => {
        isScanning.value = false;
        await BarcodeScanner.removeAllListeners();
        await BarcodeScanner.stopScan();
    };

    onMounted(() => {
        promptStartScan();
    })

    onBeforeUnmount(() => {
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