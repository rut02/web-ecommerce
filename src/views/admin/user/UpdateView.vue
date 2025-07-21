<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { useAdminUserStore } from '@/stores/admin/user'
import { useEventStore } from '@/stores/event'

const userForm = [
  { name: 'Name', field: 'name', type: 'text' },
  { name: 'Role', field: 'role', type: 'select', dropdownList: ['admin', 'user'] },
  // { name: 'Status', field: 'status', type: 'select', dropdownList: ['active', 'inactive'] }
]

const adminUserStore = useAdminUserStore()
const eventStore = useEventStore()
const route = useRoute()
const router = useRouter()

const userId = route.params.id
const userData = reactive({
  name: '',
  role: '',
  // status: ''
})

onMounted(async () => {
  const user = adminUserStore.getUserById(userId)
  if (user) {
    userData.name = user.name
    userData.role = user.role
    userData.status = user.status
  }
})

const updateUser = async () => {
  const success = await adminUserStore.updateUserById(userId, { ...userData })
  if (success) {
    eventStore.popupMessage('success', 'User updated successfully')
    router.push({ name: 'admin-user-list' })
  } else {
    eventStore.popupMessage('error', 'Failed to update user')
  }
}
</script>

<template>
  <AdminLayout>
    <div class="shadow-xl p-8 mt-4">
      <div class="text-1xl font-bold">Update User</div>
      <div class="divider"></div>
      <div class="grid grid-cols-1 gap-2">
        <div v-for="form in userForm" :key="form.field" class="form-control w-full">
          <label class="label">
            <span>{{ form.name }}</span>
          </label>
          <input
            v-if="form.type === 'text'"
            v-model="userData[form.field]"
            type="text"
            class="input input-bordered w-full"
          />
          <select
            v-else-if="form.type === 'select'"
            v-model="userData[form.field]"
            class="input input-bordered w-full"
          >
            <option v-for="item in form.dropdownList" :key="item">{{ item }}</option>
          </select>
        </div>
      </div>

      <div class="flex mt-4 justify-end gap-2">
        <button class="btn btn-ghost" @click="router.back()">Back</button>
        <button class="btn btn-neutral" @click="updateUser()">Update</button>
      </div>
    </div>
  </AdminLayout>
</template>
