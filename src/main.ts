import {createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from "@vueuse/head"

createApp(App).use(createHead()).use(createPinia()).mount('#app')
