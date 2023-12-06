import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { pinia } from '@/stores/pinia'
import { useStore } from '@/stores/modules'
import './style.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueApexCharts from "vue3-apexcharts";

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(router)
.use(vuetify)
.use(pinia)
.use(VueApexCharts)
.provide('store', useStore())
.mount('#app')