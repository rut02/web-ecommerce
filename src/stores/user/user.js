import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null
  }),
  actions: {
    async fetchProfile(userId) {
      const res = await axios.get(`${API_URL}/users/${userId}`)
      this.profile = res.data
      return res.data
    },
    async updateProfile(userId, userData) {
      const res = await axios.patch (`${API_URL}/users/${userId}`, userData);
      this.profile = res.data
      return res.data
    }
  }
})
