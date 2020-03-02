import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './locale' // Internationalization

//import './mock' // simulation data
import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // global filters

//设置多语言
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
