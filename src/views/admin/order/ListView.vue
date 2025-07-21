<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import Table from '@/components/Table.vue';
import { onMounted } from 'vue';
import { useAdminOrderStore } from '@/stores/admin/order';
import dayjs from 'dayjs'

const adminOrderStore = useAdminOrderStore();

onMounted(() => {
  adminOrderStore.fetchOrders();
});

const statusOptions = [
  'pending',
  'confirmed',
  'shipped',
  'cart',
  // 'Completed',
  // 'Cancelled'
];

const changeStatus = async (id, newStatus) => {
  await adminOrderStore.updateOrderStatus(id, newStatus);
};
</script>

<template>
  <AdminLayout>
    <div class="flex justify-between items-center my-4 px-4">
      <div class="text-3xl font-bold">Orders</div>
    </div>
    <div class="px-4">
      <Table :headers="['Customer Name', 'Total Price', 'Status', 'Updated At', '']">
        <tr v-for="order in adminOrderStore.list" :key="order._id">
          <td>{{ order.name }}</td>
          <td>{{ order.total }} ฿</td>
          <td>
            <select
              class="select select-bordered select-sm"
              v-model="order.status"
              @change="changeStatus(order._id, order.status)"
            >
              <option v-for="status in statusOptions" :value="status">
                {{ status }}
              </option>
            </select>
          </td>
          <td>{{ dayjs(order.updatedAt).format('D MMMM YYYY HH:mm') }}</td>
          <td>
            <RouterLink
              :to="{ name: 'admin-order-detail', params: { id: order._id } }"
              class="btn btn-outline btn-sm"
            >
              Detail
            </RouterLink>
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>
