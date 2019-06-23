import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import Home from './components/Home.vue'
import DragonGifts from './components/DragonGifts.vue'
import VoidBattles from './components/VoidBattles.vue'
import StatusSimulator from './components/StatusSimulator.vue'
import AdventurerMatrix from './components/AdventurerMatrix.vue'
import AdventurerList from './components/AdventurerList.vue'
import WyrmprintList from './components/WyrmprintList.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',  // Home.vue がうまく表示されなかったのでコメントアウト
  routes: [
    { path: '/', component: Home },
    { path: '/dragon-gift', component: DragonGifts },
    { path: '/void-battle', component: VoidBattles },
    { path: '/status-simulator', component: StatusSimulator },
    { path: '/adventurer-matrix', component: AdventurerMatrix },
    { path: '/adventurer-list', component: AdventurerList },
    { path: '/wyrmprint-list', component: WyrmprintList },
  ]
})

Vue.use(VueAnalytics, {
  id: 'UA-22324499-7',
  router
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
