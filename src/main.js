import 'semantic-ui-reset/reset.css'
import '@/assets/global.sass'

import Vue from 'vue'

import App from '@/App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
