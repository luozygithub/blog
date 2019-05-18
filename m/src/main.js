import Vue from 'vue'
import App from './App.vue'
import router from './router'
//mint-ui使用
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);
//rem布局
import "../utils/rem.js"

//引入axios请求数据

import axios from 'axios'
Vue.prototype.$http = axios
// 引入font-awesome
import "../public/font-awesome/css/font-awesome.min.css"


// });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
