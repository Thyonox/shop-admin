import {createApp} from 'vue'
// Global Style
import './assets/style/globalStyle.css'
// Import ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Import RemixIcon
import 'remixicon/fonts/remixicon.css'
// Import VueRouter
import router from './router'
// Import Pinia
import store from "@/store/index.js";
import App from './App.vue'

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
