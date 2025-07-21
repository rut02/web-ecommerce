// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueApexCharts from 'vue3-apexcharts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App.vue'
import router from './router'
import './style.css'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faPenToSquare, faTrash)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
