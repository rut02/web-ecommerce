<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useAdminProductStore } from '@/stores/admin/product'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const imageFile = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
  }
}


const productStore = useAdminProductStore()
const route = useRoute()
const router = useRouter()

const productId = ref(null)

const selectedProduct = reactive({
  name: '',
  imageUrl: '',
  price: 0,
  stock: 0,
  about: '',
  status: 'open'
})

const mode = computed(() => (productId.value ? 'Edit' : 'Add'))

onMounted(async () => {
  if (route.params.id) {
    productId.value = route.params.id
    const product = await productStore.getProductById(productId.value)
    if (product) {
      Object.assign(selectedProduct, product)
    }
  }
})

const saveProduct = async () => {
  const payload = { ...selectedProduct, imageFile: imageFile.value }
  if (productId.value) {
    await productStore.updateProduct(productId.value, payload)
  } else {
    await productStore.addProduct(payload)
  }
  console.log("hlkhfgobj")
  router.push({ name: 'admin-product-list' })
}

</script>

<template>
  <AdminLayout>
    <div class="flex pt-8 px-6">
      <div class="card w-full p-6 bg-base-100 shadow-xl mt-2">
        <div class="text-xl font-semibold">{{ mode }} Product</div>
        <div class="divider mt-2"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control w-full">
            <label class="label"><span class="label-text">Name</span></label>
            <input type="text" v-model="selectedProduct.name" class="input input-bordered w-full" />
          </div>
      <div class="form-control w-full">
  <label class="label"><span class="label-text">Image</span></label>
  <input type="file" accept="image/*" @change="handleImageUpload" class="file-input file-input-bordered w-full" />
</div>

          <div class="form-control w-full">
            <label class="label"><span class="label-text">Price</span></label>
            <input type="number" v-model="selectedProduct.price" class="input input-bordered w-full" />
          </div>
          <div class="form-control w-full">
            <label class="label"><span class="label-text">Stock</span></label>
            <input type="number" v-model="selectedProduct.stock" class="input input-bordered w-full" />
          </div>
          <div class="form-control w-full md:col-span-2">
            <label class="label"><span class="label-text">Description</span></label>
            <textarea v-model="selectedProduct.description" class="textarea textarea-bordered w-full" rows="4" />
          </div>
          <div class="form-control w-full">
            <label class="label"><span class="label-text">Status</span></label>
            <select v-model="selectedProduct.status" class="select select-bordered w-full">
              <option value="open">Open</option>
              <option value="close">Close</option>
            </select>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex justify-end mt-4">
          <RouterLink to="/admin/products" class="btn btn-ghost">Back</RouterLink>
          <button @click="saveProduct" class="btn btn-primary ml-4">{{ mode }}</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
