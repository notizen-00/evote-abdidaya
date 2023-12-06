<script setup>
import ApplicationLayout from '@/layout/ApplicationLayout.vue'
import HelloWorld from '../components/HelloWorld.vue';
import ListVote from '@/components/ListVote/ListVote.vue';
import Chart from '@/components/Chart/Chart.vue';
import {
    ref,
    onMounted,
    inject
}from 'vue'
const store = inject('store')
const imageLayout = [
   
    {
      cols: 12,
      children: [{ cols: 12 }, { cols: 12 }],
    },
    { cols: 6 },
    { cols: 4 },
    { cols: 8 },
   
  ]
onMounted(()=>{
    // alert('hi')

    store.mapStore.setGeolocation()
    

})
</script>

<template>
  <ApplicationLayout>
    <template #content>
        <v-container>
            <h3 class="text-h6 text-center">Beranda </h3>
            <v-divider thickness="8" color="success" class="border-blue-600 border-opacity-90"></v-divider>
        </v-container>
        <v-container>
      

          <v-row>
            <template v-for="(image,imgIdx) in imageLayout" :key="imgIdx">
              <v-col :cols="image.cols">
               <!-- <v-card variant="outlined overf" height="200" color="blue"> -->
                    <Chart></Chart>
               <!-- </v-card> -->
              </v-col>
        
              <v-col v-if="image.children" cols="6" class="d-flex flex-column">
                <v-row>
                  <v-col v-for="(children,childIdx) in image.children" :key="childIdx" :cols="children.cols">
                    <v-card variant="tonal" class="h-full" color="red">

                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </template>
          </v-row>
          </v-container>
       
        <!-- <ListVote class="mt-10"></ListVote> -->
    
    </template>
  </ApplicationLayout>
  <HelloWorld></HelloWorld>
 
</template>
