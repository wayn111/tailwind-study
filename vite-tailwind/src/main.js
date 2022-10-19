import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import'./ws'
import './permission'
import './index.css'
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(router)
app.mount('#app')