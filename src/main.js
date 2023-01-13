import Vue from 'vue';
import App from './App.vue';
import './plugins/elements';
// все компогненты из el-ui доступны без дополнительного импорта

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
