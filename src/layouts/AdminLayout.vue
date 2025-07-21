<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const menus = [
    {
        name: "Dashboard",
        routeName: "admin-dashboard"
    },
    {
        name: "User",
        routeName: "admin-user-list"
    },
    {
        name: "Product",
        routeName: "admin-product-list"
    },
    {
        name: "Order",
        routeName: "admin-order-list"
    },
    // {
    //     name: "Logout",
    //     routeName: "login"
    // }
]
const route = useRoute()
const activeMennu = ref('')
const logout = () => {
    authStore.logout()
    router.push({ name: 'login' })

}

onMounted(() => {
    activeMennu.value = route.name
})

</script>
<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content mx-4">
            <!-- Page content here -->
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li><a class="text-3xl font-bold mb-2">BackOffice</a></li>
                <li v-for="menu in menus">
                    <RouterLink :class="menu.routeName == activeMennu ? 'menu-active' : ''" :to="{ name: menu.routeName }">
                        {{ menu.name }}
                    </RouterLink>
                </li>
                <li @click="logout()"><a>Logout</a></li>

            </ul>
        </div>
    </div>

    <!-- <div>Footer</div> -->
</template>