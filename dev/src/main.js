import Vue from 'vue'
import router from './router';
import store from './store'
import App from './App.vue';
//import { getData } from './import.js'

import HomepageWidget from './views/HomepageWidget'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import DataTable from './components/DataTable'
import PeriodeSelector from './components/PeriodeSelector'
import HeaderDatagouv from './components/HeaderDatagouv'
import FooterDatagouv from './components/FooterDatagouv'

import vueCustomElement from 'vue-custom-element'
//Vue.use(getData(store))

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('homepage-widget', HomepageWidget)
Vue.customElement('bar-chart', BarChart)
Vue.customElement('line-chart', LineChart)
Vue.customElement('data-table', DataTable)
Vue.customElement('periode-selector', PeriodeSelector)
Vue.customElement('header-datagouv', HeaderDatagouv)
Vue.customElement('footer-datagouv', FooterDatagouv)




new Vue({
    router,
    render: (h) => h(App),
    store,
  }).$mount('#app');