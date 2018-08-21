import Vue from "vue";
import Parse from "parse";

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Parse.initialize("timeline", "VT50qcuJgmg1H77NE2qFXUzHWoYBRPUic9VDBYRW5lIyxyQO")
Parse.serverURL = 'https://parse.grin.ly/parse'
Vue.prototype.$p = Parse

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
