import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Vote from '../pages/DetailVote.vue'
import Votes from '@/pages/Votes.vue'
import Device from '../pages/Device.vue'
import Start from '@/pages/Start.vue'

const routes = [
    {
      path: '/',
      name:'Start',
      component:Start
    },
    {
      path: '/detail-vote',
      name:'detail_vote',
      component:Vote
    },
    {
      path: '/vote',
      name:'vote',
      component:Votes
    },
    {
      path: '/beranda',
      name:'beranda',
      component:Home
    },
    {
      path: '/device',
      name:'device',
      component:Device
    },
   
   
  ]
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  
  
  export default router
  
