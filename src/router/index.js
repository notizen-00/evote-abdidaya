import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/HelloWorld.vue'
import Beranda from '@/pages/Beranda.vue'
import Agenda from '@/pages/Agenda.vue'
import Pengumuman from '@/pages/Pengumuman.vue'
import Panduan from '@/pages/Panduan.vue'
import Video from '@/pages/Video.vue'
import DetailHotel from '@/pages/DetailHotel.vue'

const routes = [
    {
      path: '/',
      name:'Home',
      component:Home
    },
    {
      path:'/beranda',
      name:'beranda',
      component:Beranda
    }
    ,
    {
      path:'/video',
      name:'video',
      component:Video
    }
    ,
    {
      path:'/panduan',
      name:'panduan',
      component:Panduan
    }
    ,
    {
      path:'/agenda',
      name:'agenda',
      component:Agenda
    }
    ,
    {
      path:'/pengumuman',
      name:'pengumuman',
      component:Pengumuman
    },
    {
      path: "/detail_hotel/:placeId",
      name:'detailHotel',
      component:DetailHotel
    }
   
  ]
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  
  
  export default router
  
