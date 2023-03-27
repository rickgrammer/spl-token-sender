<script setup lang="ts">
import SendForm from './components/SendForm.vue'
import WalletImporter from './components/WalletImporter.vue'

</script>

<template>
  <div class="min-h-screen bg-blue-100">
    <Toast />
    <div class="bg-yellow-400 text-center p-2 mb-2">
      This is a completely client based wallet.
      Do not import your actual wallet, use a dummy wallet from dev net for experimentation.
    </div>
    <div class="mx-auto w-full md:w-1/3">
      <WalletImporter />
      <SendForm />
    </div>
  </div>
</template>

<style scoped></style>
