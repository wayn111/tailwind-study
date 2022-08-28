import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './permission'
import './index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'


const app = createApp(App)
app.use(router)
app.mount('#app')
