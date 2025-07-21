// stores/admin/user.js
import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useAdminUserStore = defineStore('admin-user', {
  state: () => ({
    list: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const res = await axios.get(`${API_URL}/users`);
        this.list = res.data;
        return true;
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err.message);
        return false;
      }
    },

    getUserById(userId) {
      return this.list.find(user => user._id === userId) || null;
    },

    async updateUserById(userId, userData) {
      try {
        console.log(userData)
        const res = await axios.patch (`${API_URL}/users/${userId}`, userData);
        // update local list
        const index = this.list.findIndex(user => user._id === userId);
        if (index !== -1) this.list[index] = res.data;
        return true;
      } catch (err) {
        console.error('Error updating user:', err.response?.data || err.message);
        return false;
      }
    },

    async removeUserById(userId) {
      try {
        const res = await axios.delete(`${API_URL}/users/${userId}`);
        this.list = this.list.filter(user => user._id !== userId);
        return true;
      } catch (err) {
        console.error('Error deleting user:', err.response?.data || err.message);
        return false;
      }
    }
  }
});
