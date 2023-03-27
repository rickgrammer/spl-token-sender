<script setup lang="ts">
import state from '../store'
import {reactive, ref} from 'vue';
import {sendCoin, getAlltokens} from '../composables/solana';
import {useToast} from 'primevue/usetoast';
const payload = reactive({
  receiver: '',
  amount: 0,
  coins: '',
})
const sending = ref(false)
const toast = useToast()
const currentCoin = ref<any>()
async function handleSendCoin() {
  sending.value = true
  try {
    await sendCoin(payload.receiver, Number(payload.amount*(10**currentCoin.value.decimals)), currentCoin.value.mintAddress)
    await getAlltokens()
    toast.add({
      summary: 'Coins sent successfully',
      severity: 'success'
    })
    currentCoin.value = state.coins.filter((x: any) => x.mintAdress === currentCoin.value.mintAdress)[0]
  } catch (e) {
    toast.add({
      summary: 'Error',
      detail: e,
      severity: 'error'
    })
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form class="p-1 md:p-0 flex flex-col space-y-2 mx-auto">
    <label for="receiver">Receiver Address</label>
    <InputText v-model="payload.receiver" type="text" name="receiver" id="receiver" />

    <label for="amount">Amount</label>
    <InputNumber v-model="payload.amount" name="amount" id="amount" />
    <Dropdown v-model="currentCoin" :options="state.coins" optionLabel="symbol" placeholder="Select a coin" class="w-full md:w-14rem">
      <template #option="slotProps">
          <div class="flex justify-between">
              <div>{{ slotProps.option.symbol }}</div>
              <div>{{ slotProps.option.balance }}</div>
          </div>
      </template>
    </Dropdown>
    <div v-if="state.coins?.length !== 0 && currentCoin" class="p-2 flex justify-between">
      <span>Balance</span>
      <span>{{currentCoin?.balance}} {{currentCoin?.symbol}}</span>
    </div>
    <p-button @click.prevent="handleSendCoin" :loading="sending" label="Send"/>
  </form>
</template>
