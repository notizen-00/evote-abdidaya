<template>
    <div>
        <v-container class="bg-red test mt-10 mb-10" :class="{ 'barcode-scanner-active': isScanning }">
            {{ barcodee }}
        </v-container>

        <v-btn @click="promptStartScan">Start Scan</v-btn>
        <button @click="stopScan">Stop Scan</button>
    </div>
</template>

<script setup>
    import {
        ref
    } from 'vue';
    import axios from 'axios'
    import {
        BarcodeScanner,
        BarcodeFormat,
        LensFacing,
    } from '@capacitor-mlkit/barcode-scanning';

    const isScanning = ref(false);
    const barcodee = ref('');
    const shouldStopScan = ref(false);

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

                    if (result.barcode.displayValue !== 'test') {
                        alert('QR tidak valid, silahkan beri yang valid');
                        isScanning.value = false
                        await BarcodeScanner.removeAllListeners();
                        await BarcodeScanner.stopScan();

                    } else {
                        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/votedb';
                        const data = {
                            // Your data to be sent in the POST request body
                            deviceid: 123,
                            vote: 1,
                            namabooth: 'kendokenceng'

                        };

                        const config = {
                            headers: {
                                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', // Add your custom header here
                                'Content-Type': 'application/json', // Adjust the content type if needed
                            },
                        };
                        try {
                            const response = await axios.post(url, data, config);
                            console.log('POST request successful:', response.data);
                            alert('terima kasih telah vote KendoKenceng')
                            // Handle the response as needed
                        } catch (error) {
                            console.error('Error making POST request:', error);
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
</script>

<style scoped>
    body.barcode-scanner-active {
        visibility: hidden;
    }

    .barcode-scanner-modal {
        visibility: visible;
    }
</style>