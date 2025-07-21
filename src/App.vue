<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useCartStore } from './stores/user/cart';
import { useUserProductStore } from './stores/user/product';
import { useEventStore } from './stores/event';

import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
auth.restoreSession() // โหลด token จาก localStorage แล้ว set Header

const cartStore = useCartStore()
const productStore = useUserProductStore()
const eventStore = useEventStore()

onMounted(async () => {
  await cartStore.fetchCart()
  // productStore.loadProduct()
  eventStore.popupMessage('success', 'Welcome to our store!')
})
</script>

<template>
  <div>
    <div class="toast">
      <div class="alert alert-info">
        <span>{{ eventStore.data.message }}</span>
      </div>
    </div>
    <RouterView />
  </div>
</template>