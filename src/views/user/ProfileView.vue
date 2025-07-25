<script setup>
import { reactive, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useUserStore } from '@/stores/user/user'
import { useAuthStore } from '@/stores/auth'

const userStore = useUserStore()
const authStore = useAuthStore()
const user = authStore.decodeToken()

const userForm = [
  { name: 'Email', field: 'email' },
  { name: 'Name', field: 'name' }
]

const userData = reactive({
  email: '',
  name: ''
})

// โหลดข้อมูลผู้ใช้เมื่อ component mount
onMounted(async () => {
  const profile = await userStore.fetchProfile(user.sub)
  if (profile) {
    userData.email = profile.email
    userData.name = profile.name
  }
})

// อัปเดตข้อมูลผู้ใช้
const updateProfile = async () => {
  await userStore.updateProfile(user.sub, userData)
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md">
      <h1 class="text-2xl">Your profile</h1>

      <div v-for="item in userForm" :key="item.field" class="form-control w-full mt-4">
        <label class="label">
          <span class="label-text">{{ item.name }}</span>
        </label>
        <input
          type="text"
          class="input input-bordered w-full"
          v-model="userData[item.field]"
        />
      </div>

      <button class="btn btn-primary w-full mt-6" @click="updateProfile">Update profile</button>
    </div>
  </UserLayout>
</template>
