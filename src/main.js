import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import vClickOutside from 'click-outside-vue3'

import './assets/styles/main.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(vClickOutside)
app.mount('#app')