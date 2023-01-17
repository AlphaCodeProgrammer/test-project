import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./scss/main.scss";
import router from "./router";
import store from "./store/store";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
