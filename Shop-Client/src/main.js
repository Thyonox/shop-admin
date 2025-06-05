import {createApp} from 'vue'
// Global Style
import './assets/style/globalStyle.css'
// Import ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Import RemixIcon
import 'remixicon/fonts/remixicon.css'
// Import VueRouter
import router from './router'
// Import Pinia
import store from "@/store/index.js";
import './permission.js';
import App from './App.vue'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
