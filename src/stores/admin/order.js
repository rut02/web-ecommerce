// stores/admin/order.js
import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useAdminOrderStore = defineStore("admin-order", {
  state: () => ({
    list: [],
  }),
  actions: {
    async fetchOrders() {
      try {
        const res = await axios.get(`${API_URL}/orders`);
        this.list = res.data;
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    },
    async updateOrderStatus(id, newStatus) {
      try {
        const res = await axios.patch(`${API_URL}/orders/${id}`, {
          status: newStatus,
        });
        const index = this.list.findIndex(o => o._id === id);
        if (index !== -1) {
          this.list[index].status = res.data.status;
        }
      } catch (err) {
        console.error("Error updating status", err);
      }
    },
    getOrder(id) {
      return this.list.find((o) => o._id === id);
    },
async fetchOrderById(id) {
  try {
    const res = await axios.get(`${API_URL}/orders/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching order by ID", err);
    return null;
  }
}


  },
});
