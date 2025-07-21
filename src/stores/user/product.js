// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
export const useUserProductStore = defineStore('user-product', {

  state: () => ({
    list: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`${API_URL}/products`)
        this.list = res.data
      } catch (err) {
        console.error('Error fetching products:', err)
        this.error = err
      } finally {
        this.loading = false
      }
    },
        async  loadProtectedImage(productId) {
          // console.log(productId)
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/products/image/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = await response.blob();
  return URL.createObjectURL(blob);  
},
  async searchProduct(query) {
      try {
        const res = await axios.get(`${API_URL}/products/search/products`, {
          params: { query }
        })
        this.list = res.data
      } catch (err) {
        console.error('Error searching products:', err)
      }
    },
  }

  
})
