import { defineStore } from 'pinia'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL
export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    salesPerDay: [],
    statusCounts: [],
    loading: false
  }),

  actions: {
    async fetchSummary() {
      try {
        const res = await axios.get(`${API_URL}/orders/admin/dashboard-summary`)
        const { totalOrders, totalProducts, totalUsers } = res.data
        this.totalOrders = totalOrders
        this.totalProducts = totalProducts
        this.totalUsers = totalUsers
      } catch (err) {
        console.error('Error fetching summary:', err)
      }
    },

    async fetchStats() {
      try {
        const res = await axios.get(`${API_URL}/orders/admin/sales-stats`)
        this.salesPerDay = res.data.salesPerDay
        this.statusCounts = res.data.statusCounts
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    },

    async fetchAll() {
      this.loading = true
      await Promise.all([this.fetchSummary(), this.fetchStats()])
      this.loading = false
    }
  }
})
