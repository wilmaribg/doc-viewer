import './styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import useAuthConfig from './composables/useAuthConfig'
import App from './App.vue'

const domain = 'https://dev4.prolibu.com'
const apiKey =
  'bf991800d5ed76f154a49c53a3fd5a6c079986d9b449a26f741ee638763b4effd581313e293e34e9b2f3ddff6fc474eb'

const app = createApp(App)

app.use(createPinia())
app.use(useAuthConfig, { domain, apiKey })

app.mount('#app')
