
import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: null, // เก็บข้อมูล Order ที่ status เป็น 'cart'
    orders: [], // เก็บคำสั่งซื้อที่ confirmed
  }),

  getters: {
    summaryQuantity(state) {
      return state.cart && state.cart.items
        ? state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
        : 0;
    },
    summaryPrice(state) {
      return state.cart && state.cart.items
        ? state.cart.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)
        : 0;
    },
  },

  actions: {
    async fetchCart(userId) {
      try {
        const response = await axios.get(`${API_URL}/orders/cart/${userId}`);
        this.cart = response.data;
        return response.data;
      } catch (err) {
        console.error('Error fetching cart:', err.response?.data || err.message);
        this.cart = null;
        return null;
      }
    },

    async addToCart(userId, product, quantity = 1) {
      try {
        // await this.fetchCart(userId);
        // if (this.cart) {
          // เพิ่มสินค้าใน cart ที่มีอยู่
          const requestBody = {
  user: userId,
  items: [{ product: product._id, quantity }],
  status: 'cart'
};
          const response = await axios.post(`${API_URL}/orders`, requestBody);
          this.cart = response.data;
        // } else {
        //   // สร้าง cart ใหม่
        //   const response = await axios.post('/orders', {
        //     user: userId,
        //     items: [{ product: product._id, quantity }],
        //     status: 'cart',
        //   });
        //   this.cart = response.data;
        // }
      } catch (err) {
        console.error('Error adding to cart:', err.response?.data || err.message);
        throw err;
      }
    },
async updateItemQuantity(productId, quantity) {
  try {
    if (!this.cart) {
      throw new Error('No cart available');
    }

    const response = await axios.patch(
      `${API_URL}/orders/${this.cart._id}/update-item/${productId}`,
      { quantity }
    );

    this.cart = response.data;
  } catch (err) {
    console.error('Error updating quantity:', err.response?.data || err.message);
    throw err;
  }
},
    async removeFromCart(productId) {
      try {
        if (!this.cart) {
          throw new Error('No cart available');
        }
        const response = await axios.patch(`${API_URL}/orders/${this.cart._id}/remove-item/${productId}`);
        this.cart = response.data;
        if (this.cart.items.length === 0) {
          this.cart = null; // ลบ cart ถ้าไม่มี items
        }
      } catch (err) {
        console.error('Error removing from cart:', err.response?.data || err.message);
        throw err;
      }
    },

    async checkout( address) {
      try {
        if (!this.cart) {
          throw new Error('No cart available');
        }
        const response = await axios.post(`${API_URL}/orders/${this.cart._id}/checkout`,  address );
        this.orders.push(response.data);
        this.cart = null; 
        console.log(response.data)
        return response.data;
      } catch (err) {
        console.error('Error checking out:', err.response?.data || err.message);
        throw err;
      }
    },

    async fetchOrders(userId) {
      try {
        const response = await axios.get(`${API_URL}/orders/user/${userId}`);
        this.orders = response.data;
        return response.data;
      } catch (err) {
        console.error('Error fetching orders:', err.response?.data || err.message);
        return [];
      }
    },
    async getOrderById(orderId) {
      try {
        const response = await axios.get(`${API_URL}/orders/${orderId}`);
        return response.data;
      } catch (err) {
        console.error('Error fetching order by ID:', err.response?.data || err.message);
        return null;
      }
    },
  },
});
