import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./http";
import ElementUI from "element-ui";
import moment from "dayjs";
import VCharts from "v-charts";
import lodash from "lodash";
import JsonExcel from "vue-json-excel";
import "element-ui/lib/theme-chalk/index.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.config.productionTip = false;
// import axios from 'axios'

// 将axios挂载到全局
Vue.use(mavonEditor);
Vue.prototype.$axios = http;
Vue.prototype.$lodash = lodash;
Vue.prototype.$moment = moment;
//已经在全局了  vue 直接this.$

Vue.component("downloadExcel", JsonExcel);
Vue.use(ElementUI);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
//$mount挂载方式=el:"url"
