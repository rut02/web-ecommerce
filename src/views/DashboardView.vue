<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashbord'
import dayjs from 'dayjs'

const dashboard = useDashboardStore()

onMounted(() => {
  dashboard.fetchAll()
})

const priceChart = computed(() => ({
  options: {
    chart: { id: 'sales-per-day' },
    xaxis: {
      categories: dashboard.salesPerDay.map(s => dayjs(s._id).format('D MMM')),
      title: { text: 'วันที่' }
    }
  },
  series: [{
    name: 'ยอดขาย',
    data: dashboard.salesPerDay.map(s => s.totalSales)
  }]
}))

const categoryChart = computed(() => ({
  options: {
    labels: dashboard.statusCounts.map(s => s._id),
    legend: {
      position: 'bottom'
    }
  },
  series: dashboard.statusCounts.map(s => s.count)
}))
</script>

<template>
  <AdminLayout>
    <div class="my-4 text-3xl font-bold">Dashboard</div>

    <!-- Stats -->
    <div class="stats w-full shadow mb-4">
      <div class="stat">
        <div class="stat-title">Orders</div>
        <div class="stat-value">{{ dashboard.totalOrders }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Products</div>
        <div class="stat-value">{{ dashboard.totalProducts }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Users</div>
        <div class="stat-value">{{ dashboard.totalUsers }}</div>
      </div>
    </div>

    <!-- Charts -->
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-1 bg-white p-4 rounded-xl shadow">
        <h2 class="text-lg font-bold mb-2">ยอดขายรายวัน</h2>
        <apexchart type="bar" :options="priceChart.options" :series="priceChart.series" height="300" />
      </div>

      <div class="flex-1 bg-white p-4 rounded-xl shadow">
        <h2 class="text-lg font-bold mb-2">สถานะคำสั่งซื้อ</h2>
        <apexchart type="donut" :options="categoryChart.options" :series="categoryChart.series" height="300" />
      </div>
    </div>
  </AdminLayout>
</template>
