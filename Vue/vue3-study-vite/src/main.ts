import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);

let app = createApp(App);
app.use(pinia);

app.mount("#app");
