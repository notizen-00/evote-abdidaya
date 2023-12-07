import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router'
import {Toast} from '@capacitor/toast'
export const useVoteStores = defineStore('voteStore', {
  state: () => ({
    login: false,
    token:'',
    lokasi:{
        lat:'',
        lng:''
    },
    listVote:[],
    nominasiId:null,
    jenisVoteId:null,
    detail:[],
    deviceId:null,
    ormawa:[],
    pt:[],
    dialog:false,
    detailNominasi:[],
    check:[],
    checkVoteResult:{}
  
 
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
    toggleDialog() {
        this.dialog = !this.dialog
    },
    async setNominasiId(id){
        this.nominasiId = id
    },
    async setDeviceId(id){
        this.deviceId = id
    },
    async setVoteId(id){
        this.jenisVoteId = id
    },
    async resetNominasiId(){
        this.nominasiId = null    
    },
    async resetVoteId(){
        this.jenisVoteId = null    
    },
    async checkVote(id){
        var deviceId = this.deviceId
        const url = `https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/vote?limit=25&shuffle=0&offset=0&%26=(deviceId,eq,${deviceId})&where=(nc_198x___jenis_vote_id,eq,${id})`;
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        try{
            const response = await axios.get(url,config);

            return response.data.list.length
        }catch(e){
            alert(e.message);
        }
   
    },
    async cekVote(id){
        const test = await this.checkVote(id);
        return test;
    },
    async fetchNominasi(id){
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/daftar_ormawa/'+id;
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);

        this.detailNominasi = response.data

    },
    async fetchOrmawa(){
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/daftar_ormawa?limit=50&shuffle=0&offset=0';
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);

        this.ormawa = response.data.list
    },
    async fetchPt(){
        const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/daftar_pt?limit=25&shuffle=0&offset=0';
        const config = {
            headers: {
                'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn', 
                'Content-Type': 'application/json', 
            },
        };
        const response = await axios.get(url,config);

        this.pt = response.data.list
    },
  
    async doVote(){
        if(this.nominasiId == null){
            await Toast.show({
                text: 'Silahkan pilih nominasi'
              });
        }else{
            if(confirm('apakah yakin ingin vote?')){
                const url = 'https://form.apps.unej.ac.id/api/v1/db/data/v1/voting-apps/vote';
const config = {
  headers: {
    'xc-token': '5_YUBoU2hxZADrLYnJCRcgLZU3WMhTA1n2lAxFOn',
    'Content-Type': 'application/json',
  },
};

const requestData = {

  "deviceid": this.deviceId,
  "vote": 1,
  "nc_198x___jenis_vote_id": this.jenisVoteId,
  "nc_198x___nominasi_id": this.nominasiId
};
try{
    const response = await axios.post(url, requestData, config);
    this.dialog = false
    await Toast.show({
        text: 'Berhasil Vote '
      });
                    router.push('/beranda')
}catch(e)
{
    alert(e.message)
}

            }else{
                this.dialog = false
            }
           
        }
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
    isDialogActive() {
      return this.dialog
    },
    getList(){
        return this.listVote
    },
    getOrmawa(){
        return this.ormawa
    },
    getPt(){
        return this.pt
    },
    getToken(){
        return this.token
    },
    getCheck(){
        return this.check
    },
    getNominasiId(){
        return this.nominasiId
    },
    getJenisVoteId(){
        return this.jenisVoteId
    },
    getDetail()
    {
        return this.detail
    },
    getDetailNominasi()
    {
        return this.detailNominasi
    },
    getLokasi()
    {
        return this.lokasi
    },
    getCheck()
    {
        return this.check
    }

  },
  persist:true
})