// src/store/modules/index.js

import { useVoteStores } from './voteStore'
import { useMapStores } from './mapStore'
// Impor modul-modul lain jika ada

export function useStore() {
  return {
    voteStore:useVoteStores(),
    mapStore:useMapStores(),
  
    
  }
}
