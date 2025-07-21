// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = import.meta.env.VITE_API_URL
console.log("api",api)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
     async login(email, password) {
      try {

        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
          console.error('Invalid email or password');
          return false;
        }

        const res = await axios.post(api + '/auth/login', {
          email,
          password,
        });

        if (res.status !== 201 || !res.data.access_token) {
          console.error('Login failed: No access token received');
          return false;
        }

        this.token = res.data.access_token;
        localStorage.setItem('token', this.token);


        if (typeof this.token !== 'string') {
          console.error('Invalid token: Must be a string');
          return false;
        }

        this.user = jwtDecode(this.token);
        
        this.setAxiosAuthHeader();
        return true;
      } catch (error) {
      
        console.error('Login error:', error.response?.data || error.message);
        return false;
      }
    },
    decodeToken() {
      const token = localStorage.getItem('token')
      if (token) {
        return jwtDecode(token)
      }
      return null
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
async register(name, email, password) {
  try {
    const res = await axios.post(api + '/auth/register', {
      name,
      email,
      password
    })
    return res.data
  } catch (err) {
    console.error('Register failed:', err.response?.data || err.message)
    throw new Error('Register failed')
  }
},


    // ใช้ตอน login สำเร็จ หรือ reload app แล้วมี token
    setAxiosAuthHeader() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },

    restoreSession() {
      if (this.token) {
        this.user = jwtDecode(this.token)
        this.setAxiosAuthHeader()
      }
    }
  }
})
