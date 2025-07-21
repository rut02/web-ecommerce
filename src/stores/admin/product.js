import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useAdminProductStore = defineStore('admin-product', {
  state: () => ({
    list: [],
    loaded: false,
  }),

  actions: {
    async loadProduct() {
      try {
        const res = await axios.get(`${API_URL}/products`)
        this.list = res.data
        
        this.loaded = true
      } catch (err) {
        console.error('Error loading products:', err)
      }
    },

    async getProductById(id) {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`)
        return res.data
      } catch (err) {
        console.error('Error getting product:', err)
        return null
      }
    },

async addProduct(productData) {
  try {
    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('price', productData.price)
    formData.append('stock', productData.stock)
    formData.append('about', productData.about)
    formData.append('status', productData.status)
    if (productData.imageFile) {
      formData.append('image', productData.imageFile)
    }

    const res = await axios.post(`${API_URL}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    this.list.push(res.data)
  } catch (err) {
    console.error('Error adding product:', err)
  }
},


async updateProduct(id, productData) {
  try {
    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('price', productData.price)
    formData.append('stock', productData.stock)
    formData.append('about', productData.about)
    formData.append('status', productData.status)

    if (productData.imageFile) {
      formData.append('image', productData.imageFile)
    }

    const res = await axios.patch(`${API_URL}/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    const index = this.list.findIndex(p => p._id === id)
    if (index !== -1) {
      this.list[index] = res.data
    }
  } catch (err) {
    console.error('Error updating product:', err)
  }
},


    async removeProduct(id) {
      try {
        await axios.delete(`${API_URL}/products/${id}`)
        this.list = this.list.filter(p => p._id !== id)
      } catch (err) {
        console.error('Error removing product:', err)
      }
    },
    
    async  loadProtectedImage(productId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/products/image/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = await response.blob();
  return URL.createObjectURL(blob);  
},

  }
})