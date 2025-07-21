<script setup>
import { RouterLink } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue';
import Close from '@/components/icons/close.vue';
import { onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/user/cart';

const cartStore = useCartStore()
const authStore = useAuthStore()
const user = authStore.decodeToken()

onMounted(() => {
  fetchOrders();
});

const fetchOrders = async () => {
  await cartStore.fetchCart(user.sub); // จาก API
};

// watch(() => cartStore.needsRefresh, (newVal) => {
//   if (newVal) {
//     fetchOrders();
//     cartStore.needsRefresh = false;
//   }
// });


const changeQuantity = async (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    await cartStore.updateItemQuantity(productId, newQuantity);
    await fetchOrders();
};


const getProductImage = (imageBuffer) => {
    if (!imageBuffer || !imageBuffer.data) return 'fallback-image-url.jpg';

    try {
        // แปลง Buffer เป็น Base64
        const base64 = bufferToBase64(imageBuffer);
        return base64;
    } catch (error) {
        console.error('Error converting image:', error);
        return 'fallback-image-url.jpg'; // ใช้รูปสำรองหากแปลงไม่สำเร็จ
    }
};
const removeFromCart = async (productId) => {
    await cartStore.removeFromCart(productId);
    await fetchOrders();
};

function bufferToBase64(bufferData) {
    const binary = bufferData.data.map(byte => String.fromCharCode(byte)).join('');
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
}
</script>


<template>
    <UserLayout>
        <h1 class="text-3xl font-bold mb-6 text-center">ตะกร้าสินค้า</h1>
        <div class="container mx-auto px-4">
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- ส่วนรายการสินค้า -->
                <div class="flex-auto lg:w-2/3 bg-white rounded-lg shadow-md p-6 overflow-auto max-h-[70vh]">
                    <div v-if="cartStore.cart === null " class="text-center py-10">
                        <p class="text-lg text-gray-500">ตะกร้าสินค้าของคุณว่างเปล่า</p>
                        <RouterLink to="/" class="btn btn-primary mt-4">เลือกซื้อสินค้า</RouterLink>
                    </div>
                    <div v-else class="flex flex-col gap-6">
                        <div v-for="(item, index) in cartStore.cart.items" :key="item._id"
                            class="flex gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition">
                            <div class="w-24 h-24 flex-shrink-0">
                                <img class="w-full h-full object-cover rounded"
                                    :src="getProductImage(item.product.image)" :alt="item.product.name">
                            </div>
                            <div class="flex-1 flex flex-col justify-between">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3 class="font-semibold text-lg">{{ item.product.name }}</h3>
                                        <p class="text-sm text-gray-600">{{ item.product.description }}</p>
                                        <p class="text-primary font-medium">฿{{ item.unitPrice }}</p>
                                    </div>
                                    <button @click="removeFromCart(item.product._id)"
                                        class="text-gray-500 hover:text-red-500 transition">
                                        <!-- <Close class="w-5 h-5" /> -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <select v-model="item.quantity" @change="changeQuantity(item.product._id, $event)"
                                        class="select select-bordered select-sm w-20">
                                        <option v-for="qty in item.product.stock" :value="qty">
                                            {{ qty }}
                                        </option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ส่วนสรุปคำสั่งซื้อ -->
                <div class="flex-auto lg:w-1/3 bg-gray-100 rounded-lg shadow-md p-6 sticky top-4">
                    <h2 class="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>
                    <div class="divide-y divide-gray-300">
                        <div class="flex justify-between py-2">
                            <span>ราคาสินค้าทั้งหมด</span>
                            <span>฿{{ cartStore.summaryPrice }}</span>
                        </div>
                        <div class="flex justify-between py-2">
                            <span>ค่าจัดส่ง</span>
                            <span>฿0</span>
                        </div>
                        <div class="flex justify-between py-2 font-bold text-lg">
                            <span>รวมทั้งหมด</span>
                            <span>฿{{ cartStore.summaryPrice }}</span>
                        </div>
                    </div>
                    <RouterLink v-if="cartStore.cart && cartStore.cart.items.length > 0"
                        class="btn btn-primary w-full mt-6 hover:bg-primary-dark transition" :to="{ name: 'checkout' }">
                        ชำระเงิน
                    </RouterLink>
                </div>
            </div>
        </div>
    </UserLayout>
</template>