import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import axios from "axios";
if (localStorage.getItem('user-token')) {
  axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('user-token')}` }
  // axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}
axios.defaults.baseURL = "http://127.0.0.1:8000/"
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')