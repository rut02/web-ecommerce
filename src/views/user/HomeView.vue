<script setup>
import { useRouter } from 'vue-router';
import UserLayout from '@/layouts/UserLayout.vue';
import { useUserProductStore } from '@/stores/user/product'
import Product from '@/components/Product.vue';
import { useCartStore } from '@/stores/user/cart';
import { onMounted ,ref} from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const router = useRouter();
const productStore = useUserProductStore()
const cartStore = useCartStore()
const imageMap = ref({})
const user = authStore.decodeToken()
const loadImages = async () => {
  for (const product of productStore.list) {
    const url = await productStore.loadProtectedImage(product._id)
    imageMap.value[product._id] = url
  }
}
onMounted(async () => {
  await productStore.fetchProducts()
  await loadImages()
  await cartStore.fetchCart(user.sub)

})

const addToCart =async (product) => {
  
  console.log(user.sub)
  
  console.log("add to cart")
  console.log(product)
  await cartStore.addToCart(user.sub,product)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <!-- Hero Section -->
    <!-- <section class="hero min-h-[60vh] bg-gradient-to-r from-base-200 to-base-300">
      <div class="hero-content text-center">
        <div class="max-w-xl">
          <h1 class="text-5xl font-bold text-primary">Welcome to Our Shop</h1>
          <p class="py-6 text-gray-600">
            Discover amazing products, add them to your cart, and enjoy a smooth shopping experience!
          </p>
          <router-link :to="{ name: 'search' }">
            <button class="btn btn-primary">Browse Products</button>
          </router-link>
        </div>
      </div>
    </section> -->

    <!-- Products Section -->
    <section class="mt-10 px-4">
      <h2 class="text-2xl font-semibold mb-4 text-center">Our Products</h2>
      <Product
        :products="productStore.list"
        :imageMap="imageMap"
        :addToCart="addToCart"
      />
    </section>
  </UserLayout>
</template>
