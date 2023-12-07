import { defineStore } from 'pinia'
import axios from 'axios';
import  router from '@/router'
import { Toast } from '@capacitor/toast';
import { useVoteStores } from './voteStore';
export const useDeviceStores = defineStore('deviceStore', {
  state: () => ({
    dialog: false,
    mapElement:null,
    location:{
        lat:null,
        lng:null
    },
    watchId:null,
    totalVote:0,
    jatahVote:0,
    voteStore:useVoteStores()
  }),

  actions: {
    toggleDialog(){
        this.dialog = !this.dialog
    },
    setMapElement(){
        this.mapElement = !this.mapElement
    },
    async countMyVote(){
       
        const url = `https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/vote/count?where=%28deviceid%2Ceq%2C${this.voteStore.deviceId}%29`;
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);
        this.totalVote = response.data.count
        
    },
    async countJatahVote(){
       
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/jenis_vote/count';
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);
        this.jatahVote = response.data.count
        
    }
 
  

  },
  getters: {
    isDialogActive() {
      return this.dialog
    },
    getTotalVote(){
        return this.totalVote
    },
    getJatahVote(){
        return this.jatahVote
    },
    getMapElement() {
      return this.mapElement
    },
    getLocation(){
        return this.location
    }
  }
})
