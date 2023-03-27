import {Keypair} from "@solana/web3.js";
import {reactive} from "vue";

export interface appState {
  coins: any,
  wallet: Keypair | null,
}

const state = reactive({
  coins: [] as any,
  wallet: null,
} as appState)
export default state 
