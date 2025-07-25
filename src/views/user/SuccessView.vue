<script setup>
import { onMounted, ref } from 'vue';
import UserLayout from '@/layouts/UserLayout.vue';
import { useCartStore } from '@/stores/user/cart';
import { useRoute } from 'vue-router';

const route = useRoute()
const orderId = route.params.id


const cartStore = useCartStore()
const orderData = ref(null)



onMounted(async () => {
//   cartStore.loadCheckout()
//   const orderId = cartStore.checkout.orderId
  if (orderId) {
    console.log(orderId)
    const order = await cartStore.getOrderById(orderId)
    if (order) {
      orderData.value = order
    }
  }
})
</script>


<template>
  <UserLayout>
    <div class="flex justify-center">
   <div v-if="orderData" class="border border-base-300 shadow-xl p-8 max-w-2xl mb-4">
      <div>
        <div class="text-2xl font-bold">Your order is successful</div>
        <div>Order Number: {{ orderData.doc_no }}</div>
        <div>เตรียมรอรับสินค้าได้เลย</div>
      </div>

      <div class="divider px-2"></div>

      <div class="grid grid-cols-4 gap-2">
        <div>
          <div class="font-bold">Order date</div>
          <div>{{ orderData.createdDate }}</div>
        </div>
        <div>
          <div class="font-bold">Order Number</div>
          <div>{{ orderData.doc_no }}</div>
        </div>
        <div>
          <div class="font-bold">Address </div>
          <div>{{ orderData.address }}</div>
        </div>
      </div>

      <div class="divider px-2"></div>

      <div v-for="product in orderData.products" :key="product._id" class="items-center grid grid-cols-4 gap-2">
        <div>
          <img class="w-full" :src="product.imageUrl" alt="">
        </div>
        <div>ชื่อ: {{ product.name }}</div>
        <div>จำนวน: {{ product.quantity }}</div>
        <div>ราคารวม: {{ product.price * product.quantity }}</div>
      </div>

      <div class="divider px-2"></div>

      <div class="flex justify-between">
        <div>ราคาสินค้าทั้งหมด</div>
        <div>{{ orderData.total }}</div>
      </div>

      <div class="flex justify-between">
        <div>ค่าจัดส่ง</div>
        <div>0</div>
      </div>

      <div class="divider px-2"></div>

      <div class="flex justify-between">
        <div>รวมทั้งหมด</div>
        <div>{{ orderData.total }}</div>
      </div>

      <div class="divider px-2"></div>
      <div>ขอบคุณที่มาซื้อของเรา</div>
    </div>

    <div v-else class="p-8">Loading order data...</div>
    </div>
 
  </UserLayout>
</template>

