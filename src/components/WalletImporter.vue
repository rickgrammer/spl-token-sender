<script setup lang="ts">
import {ref} from 'vue';
import {useToast}  from 'primevue/usetoast'
import {Keypair} from '@solana/web3.js'
import * as bip39 from 'bip39'
import state from '../store';
import {getAlltokens} from '../composables/solana';
const walletForm = ref()
const secretPhrase = ref()
const toast = useToast()

const importingWallet = ref(false)

function toggleWalletForm(e: any) {
  walletForm.value.toggle(e)
}

async function handleImportWallet(e: any) {
  if (!secretPhrase.value) {
    toast.add({
      summary: 'secretPhrase key is empty',
      severity: 'warn' 
    })
    return
  }
  importingWallet.value = true
  const seed = bip39.mnemonicToSeedSync(secretPhrase.value, '')
  state.wallet = Keypair.fromSeed(seed.slice(0, 32))
  await getAlltokens()
  importingWallet.value = false
  walletForm.value.toggle(e)
}
// code...
</script>

<template>
  <div>
    <div class="flex space-x-2 justify-between w-full spac flex-row-reverse">
      <p-button class="" @click="toggleWalletForm">
        Import wallet 
      </p-button>
      <span v-show="state.wallet" class="break-all bg-gray-200 p-2 rounded" @click="toggleWalletForm">
        {{`Public Key: ${state.wallet?.publicKey}`}}
      </span>
    </div>
    <OverlayPanel ref="walletForm">
      <form class="p-1 md:p-0 flex flex-col space-y-2 mx-auto">
        <label for="privateKey">Secret Phrase</label>
        <InputText v-model="secretPhrase" type="password" name="receiver" id="receiver" />
        <p-button @click="handleImportWallet" :loading="importingWallet" label="Import" />
      </form>
    </OverlayPanel>
  </div>
</template>

<style scoped>
/* code... */
</style>
