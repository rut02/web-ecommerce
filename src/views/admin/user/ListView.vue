<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user'
import Table from '@/components/Table.vue'

const adminUserStore = useAdminUserStore()
const loading = ref(true)
const error = ref(null)

const loadUsers = async () => {
  loading.value = true
  error.value = null
  console.log(adminUserStore.list)
  try {
    const success = await adminUserStore.fetchUsers()
    if (!success) throw new Error('Failed to fetch users')
  } catch (err) {
    error.value = err.message || 'Unexpected error'
  } finally {
    loading.value = false
  }
}

const changeStatus = async (index) => {
    console.log(index)
  const user = adminUserStore.getUserById(index)
  console.log(user)
  if (!user) return
  const updatedUser = { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
  await adminUserStore.updateUserById(index, updatedUser)
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <AdminLayout>
    <div class="flex justify-between items-center my-4 p-4">
      <div class="text-3xl font-bold">User</div>
      <!-- <RouterLink :to="{ name: 'admin-user-create' }" class="btn btn-neutral">
        Add New
      </RouterLink> -->
    </div>

    <div v-if="loading" class="text-center py-10 text-gray-500">Loading users...</div>
    <div v-else-if="error" class="text-center py-10 text-red-500">Error: {{ error }}</div>

    <Table v-else :headers="['Name', 'Email', 'Role', 'Update At', '']">
     <tr v-for="user in adminUserStore.list" :key="user._id">
  <td>{{ user.name }}</td>
  <td>{{ user.email }}</td>
  <!-- <td>{{ user.status }}</td> -->
  <td>{{ user.role }}</td>
  <td>{{ user.updatedAt }}</td>
  <td>
    <div class="flex gap-2">
      <RouterLink :to="{ name: 'admin-user-update', params: { id: user._id } }">
        <button class="btn btn-primary">Edit</button>
      </RouterLink>
      <!-- <button :class="user.status === 'active' ? 'btn btn-error' : 'btn btn-success'" @click="changeStatus(user._id)">
        {{ user.status === 'active' ? 'Disable' : 'Enable' }}
      </button> -->
    </div>
  </td>
</tr>

    </Table>
  </AdminLayout>
</template>
