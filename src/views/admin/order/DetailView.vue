<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ref, onMounted } from 'vue';
import { useAdminOrderStore } from '@/stores/admin/order';
import { useRoute } from 'vue-router';

const adminOrderStore = useAdminOrderStore();
const route = useRoute();

const orderData = ref({
  products: []
});
const getProductImage = (imageBuffer) => {
    if (!imageBuffer || !imageBuffer.data){
      console.log("imageBuffer",imageBuffer)
      return 'fallback-image-url.jpg';
    } 

    try {
        // แปลง Buffer เป็น Base64
        const base64 = bufferToBase64(imageBuffer);
        return base64;
    } catch (error) {
        console.error('Error converting image:', error);
        return 'fallback-image-url.jpg'; // ใช้รูปสำรองหากแปลงไม่สำเร็จ
    }
};function bufferToBase64(bufferData) {
    const binary = bufferData.data.map(byte => String.fromCharCode(byte)).join('');
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
}
onMounted( async () => {
  const orderId = route.params.id;
  // const selectedOrder = adminOrderStore.getOrder(orderId);
  const selectedOrder = await adminOrderStore.fetchOrderById(orderId);
  if (selectedOrder) {
    orderData.value = selectedOrder;
  }
});
</script>

<template>
  <AdminLayout>
    <div class="shadow-xl p-6 mt-6 mx-4 bg-white rounded-lg space-y-6">
      <!-- Header -->
      <div class="text-3xl font-bold text-gray-800">Order Detail</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <p class="font-semibold text-gray-600">Order No:</p>
          <p>{{ orderData.doc_no }}</p>
        </div>
        <div>
          <p class="font-semibold text-gray-600">Customer Name:</p>
          <p>{{ orderData.name }}</p>
        </div>
        <div class="md:col-span-2">
          <p class="font-semibold text-gray-600">Shipping Address:</p>
          <p>{{ orderData.address }}</p>
        </div>
        <div>
          <p class="font-semibold text-gray-600">Status:</p>
          <span class="badge" :class="{
            'badge-success': orderData.status === 'Payment Completed',
            'badge-warning': orderData.status === 'Pending',
            'badge-info': orderData.status === 'Shipped',
            'badge-neutral': orderData.status === 'Completed',
            'badge-error': orderData.status === 'Cancelled'
          }">
            {{ orderData.status }}
          </span>
        </div>
        <div>
          <p class="font-semibold text-gray-600">Updated At:</p>
          <p>{{ orderData.updatedAt }}</p>
        </div>
      </div>

      <!-- Product List -->
      <div>
        <h2 class="text-xl font-semibold mb-2 text-gray-800">Products</h2>
        <div class="space-y-4">
          <div
            v-for="(product, i) in orderData.items"
            :key="i"
            class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div class="md:col-span-1">
              <img :src="getProductImage(product.product.image)" class="w-24 h-24 object-cover rounded-md" />
            </div>
            <div class="md:col-span-2 space-y-1">
              <div class="text-base font-bold">{{ product.product.name }}</div>
              <div class="text-sm text-gray-600">{{ product.product.description }}</div>
              <div class="text-sm">จำนวน: {{ product.quantity }}</div>
            </div>
            <div class="flex md:justify-end items-center text-right font-bold text-lg text-green-600">
              ฿{{ product.product.price }}
            </div>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="border-t pt-4 flex justify-between items-center text-xl font-bold">
        <span>Total</span>
        <span class="text-green-700">{{ orderData.total }} ฿</span>
      </div>

      <!-- Back Button -->
      <div class="flex justify-end mt-4">
        <RouterLink to="/admin/orders" class="btn btn-outline">Back</RouterLink>
      </div>
    </div>
  </AdminLayout>
</template>
