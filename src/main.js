import Vue from 'vue'

import store from './store'
//import { getData } from './import.js'

import HomepageWidget from './components/HomepageWidget'
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