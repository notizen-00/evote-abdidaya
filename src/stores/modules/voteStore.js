import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router'
export const useVoteStores = defineStore('voteStore', {
  state: () => ({
    login: false,
    token:'',
    lokasi:{
        lat:'',
        lng:''
    },
    listVote:[],
    detail:[]
  
 
  }),
  actions: {
    async fetchList() { 
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/jenis_vote?limit=25&shuffle=0&offset=0';
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);
     
        this.listVote = response.data.list;
    },
    async fetchDetail(id)
    {
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/jenis_vote/'+id;
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);

        this.detail = response.data;

    },
    destroyDetail()
    {
        this.detail = []
    }

  },
  getters: {
    isLogin() {
      return this.login
    },
    getList(){
        return this.listVote
    },
    getToken(){
        return this.token
    },
    getDetail()
    {
        return this.detail
    },
    getLokasi()
    {
        return this.lokasi
    }

  },
  persist:true
})