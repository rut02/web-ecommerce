
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    const role = authStore.user.role
    if (role === 'admin') {
      router.push({ name: 'admin-dashboard' })
    } else {
      router.push({ name: 'home' }) 
    }
  } else {
    alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center mb-6">Login</h1>

      <form class="space-y-6">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative">
            <!-- <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" ></svg> -->
            <input
              v-model="email"
              type="email"
              placeholder="mail@site.com"
              required
              class="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <!-- <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" ></svg> -->
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              class="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters and include a number, lowercase, and uppercase letter.
          </p>
        </div>

        <!-- Login Button -->
        <div>
          <div
            @click="login()"
            class="btn w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center"
          >
            Login
          </div>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <RouterLink to="/register" class="text-sm text-blue-500 hover:underline">
            ยังไม่มีบัญชี? สมัครสมาชิก
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

