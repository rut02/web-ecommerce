<script setup>
import { onMounted,ref } from 'vue'
import { RouterLink } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/stores/admin/product'
import dayjs from 'dayjs'



const adminProduct = useAdminProductStore()
const imageMap = ref({}) 

const loadImages = async () => {
  for (const product of adminProduct.list) {
    const url = await adminProduct.loadProtectedImage(product._id)
    imageMap.value[product._id] = url
  }
}
onMounted(async () => {
  await adminProduct.loadProduct()
  await loadImages()
})


const getimg = (id) => {
    console.log(id)
  imageUrl.value = adminProduct.loadProtectedImage(id)
}
const removeProduct = async (id) => {
  const confirmDelete = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')
  if (confirmDelete) {
    await adminProduct.removeProduct(id)
  }
}
</script>


<template>
  <AdminLayout>
    <div class="flex justify-between items-center my-4 p-4">
      <div class="text-3xl font-bold">Product Management</div>
      <RouterLink :to="{ name: 'admin-product-create' }" class="btn btn-primary">
        + Add New Product
      </RouterLink>
    </div>

    <div class="overflow-x-auto px-4 pb-4">
      <table class="table w-full bg-white shadow-lg rounded-lg">
        <thead class="bg-base-200">
          <tr class="text-base font-semibold text-gray-700">
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <!-- <th>Status</th> -->
            <th>Update At</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in adminProduct.list"
            :key="product._id"
            class="hover:bg-base-100 transition"
          >
            <td>{{ product.name }}</td>
            <td>
                
             <img :src="imageMap[product._id]" class="w-24 h-24 object-cover rounded" />


            </td>
            <td>฿{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <!-- <td>
              <div
                class="badge"
                :class="product.status === 'open' ? 'badge-success' : 'badge-error'"
              >
                {{ product.status }}
              </div>
            </td> -->
            <td>{{ dayjs(product.updatedAt).format('D MMMM YYYY HH:mm') }}</td>

            <td class="text-right">
              <div class="flex justify-end gap-2">
                <RouterLink
                  :to="{ name: 'admin-product-update', params: { id: product._id } }"
                  class="btn btn-outline btn-sm"
                  title="Edit"
                >
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-blue-600 text-lg" />
                </RouterLink>
                <button
                  class="btn btn-outline btn-error btn-sm"
                  @click="removeProduct(product._id)"
                  title="Delete"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" class="text-red-600 text-lg" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>
