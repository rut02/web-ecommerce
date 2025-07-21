<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    // await useAuthStore().register({ name: name.value, email: email.value, password: password.value })
    console.log('Registering:', { name: name.value, email: email.value, password: password.value })
    await authStore.register(  name.value, email.value,  password.value )
    alert('สมัครสมาชิกสำเร็จ')
    router.push({ name: 'login' })
  } catch (err) {
    alert('มีข้อผิดพลาดในการสมัคร'+err)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center mb-6">Register</h1>

      <form class="space-y-6" @submit.prevent="register">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input v-model="name" type="text" required class="input input-bordered w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="input input-bordered w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="input input-bordered w-full" />
        </div>

        <button type="submit" class="btn btn-primary w-full">Register</button>

        <div class="text-center mt-2">
          <RouterLink to="/login" class="text-sm text-blue-500 hover:underline">
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>


