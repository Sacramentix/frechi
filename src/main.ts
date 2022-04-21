import { createApp } from 'vue'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onOfflineReady() {},
})

createApp(App).mount('#app')
