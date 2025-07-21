<script setup>
import { defineProps } from 'vue';

defineProps({
    products: Array,
    addToCart: Function,
    imageMap: Object
})
</script>
<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div
      v-for="product in products"
      :key="product._id"
      class="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
    >
      <figure class="h-48 overflow-hidden">
        <img
          :src="imageMap[product._id]"
          class="object-cover w-full h-full"
          alt="product image"
        />
      </figure>
      <div class="card-body p-4">
        <h2 class="card-title text-lg font-semibold text-gray-800">{{ product.name }}</h2>
        <p class="text-sm text-gray-600 mb-2">{{ product.about }}</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary btn-sm"
            @click="addToCart(product)"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>