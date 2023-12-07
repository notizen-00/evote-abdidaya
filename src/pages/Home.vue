<script setup>
import ApplicationLayout from '@/layout/ApplicationLayout.vue'
import HelloWorld from '@/components/HelloWorld.vue';
import ListVote from '@/components/ListVote/ListVote.vue';
import Chart from '@/components/Chart/Chart.vue';
import {Toast} from '@capacitor/toast'
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

  const add = async() =>{
    await Toast.show({
                text: 'Terima kasih '
              });
  }
onMounted(()=>{
    // alert('hi')

    store.mapStore.setGeolocation()
    

})
</script>

<template>
  <ApplicationLayout>
    <template #content>
        <v-container>
            <h3 class="text-h6 text-center">Privacy Police</h3>
            <v-divider thickness="8" color="success" class="border-blue-600 border-opacity-90"></v-divider>
        </v-container>
        <v-container>
          <v-virtual-scroll
  :height="600"
  class="h-full"
  :items="['1']"
>
  <template v-slot:default="{ item }">
    <v-sheet
    border="md"
    class="pa-6 text-white mx-auto overflow-auto h-screen"
    color="#141518"
    max-width="400"

  >
    <h4 class="text-h5 font-weight-bold mb-4">Privacy Police </h4>

    <p class="mb-8">
      We respect your privacy and are committed to protecting it through our compliance with this privacy policy (“Policy”). This Policy describes the types of information we may collect from you or that you may provide (“Personal Information”) on the unej.ac.id website (“Website” or “Service”) and any of its related products and services (collectively, “Services”), and our practices for collecting, using, maintaining, protecting, and disclosing that Personal Information. It also describes the choices available to you regarding our use of your Personal Information and how you can access and update it.
      <br>
      <br>
      This Policy is a legally binding agreement between you (“User”, “you” or “your”) and this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.
      <br>
      <br>
      Please read our <a href="#" class="text-blue-accent-2">Privacy Policy</a> to learn about our privacy practices or click "Your Preferences" to exercise control over your data.
    </p>

    <v-btn
      block
      class="text-none text-black mb-4"
      color="red-accent-2"
      size="x-large"
      variant="flat"
      @click="add()"
    >
      Accept
    </v-btn>

    <!-- <v-btn
      block
      class="text-none text-black"
      color="red-accent-2"
      size="x-large"
      variant="outlined"
    >
      Your Preferences
    </v-btn> -->
  </v-sheet>
  </template>
</v-virtual-scroll>
        

          <v-row>
            <template v-for="(image,imgIdx) in imageLayout" :key="imgIdx">
              <v-col :cols="image.cols">
               <!-- <v-card variant="outlined overf" height="200" color="blue"> -->
                    <!-- <Chart></Chart> -->
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

 
</template>
