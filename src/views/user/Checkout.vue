<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { reactive } from 'vue';
import { useCartStore } from '@/stores/user/cart';
import { RouterLink, useRouter } from 'vue-router';

const cartStore = useCartStore()
const router = useRouter()

const payment = async() => {
    const response = await cartStore.checkout(userFormData)
     console.log(response._id)
    router.push({ name: 'success', params: { id: response._id } })
}
const FormData = [
    {
        name: 'Email Address',
        field: 'email'
    },
    {
        name: 'Phone Number',
        field: 'phone'
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]
const userFormData = reactive({
    email: '',
    phone: '',
    name: '',
    address: '',
    note: ''
})

</script>

<template>
    <UserLayout>
        <h1 class="text-3xl font-bold m-4">Checkout</h1>
        <div class="flex">
            <section class="flex-auto w-64 bg-base-200 p-8">
                <div v-for="form in FormData" class="form-control w-full">
                    <label class="label cursor-pointer">
                        <span>{{ form.name }}</span>
                    </label>
                    <input v-model="userFormData[form.field]" type="text" placeholder="Type here"
                        class="input input-bordered w-full">
                </div>
                <button @click="payment" class="btn btn-primary w-full mt-4">ชําระเงิน</button>
            </section>
            <section class="flex-auto w-32 bg-slate-200">
                <div v-for="item in cartStore.items" class="flex bg-white m-8 py-4">
                    <div class="flex-1">
                        <img class="w-full p-6" :src="item.imageUrl" alt="">
                    </div>
                    <div class="flex-1">
                        <div class="felx flex-col justify-between h-full">
                            <div>
                                <div><b>{{ item.name }}</b></div>
                                <div>จำนวน: {{ item.quantity }}</div>
                            </div>
                            <RouterLink class="btn btn-primary w-full" :to ="{ name: 'cart' }">Edit</RouterLink>
                        </div>

                    </div>
                </div>
                <div class="divider px-2"></div>
                <div class="p-4">
                    <div><b>Order Summary</b></div>
                    <div class="flex justify-between">
                        <div>ราคาสินค้าทั้งหมด</div>
                        <div>{{cartStore.summaryPrice}}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>ค่าจัดส่ง</div>
                        <div>0</div>
                    </div>
                     <div class="divider px-2"></div>
                    <div class="flex justify-between mb-4">
                        <div>รวมทั้งหมด</div>
                        <div>{{cartStore.summaryPrice}}</div>
                    </div>
                </div>
            </section>
        </div>
    </UserLayout>
</template>
