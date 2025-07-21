<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';
import Product from '@/components/Product.vue';
import { useUserProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';

const productStore = useUserProductStore()
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const searchText = ref('')
const imageMap = ref({})

const loadImages = async () => {
  imageMap.value = {} // เคลียร์ของเก่า
  for (const product of productStore.list) {
    const url = await productStore.loadProtectedImage(product._id)
    imageMap.value[product._id] = url
  }
}

watch(() => route.query.q, async (newSearchText) => {
    console.log(newSearchText)
  searchText.value = newSearchText
  await productStore.searchProduct(searchText.value)
  await loadImages()
}, { immediate: true })

const filteredProducts = computed(() => productStore.list)

const addToCart = (product) => {
  cartStore.addToCart(product)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <div class="text-3xl ml-4">Search: <b>{{ route.query.q }}</b></div>
    <Product :products="filteredProducts" :addToCart="addToCart" :imageMap="imageMap" />
  </UserLayout>
</template>
