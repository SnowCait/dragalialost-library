import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import DragonGifts from './components/DragonGifts.vue'
import VoidBattles from './components/VoidBattles.vue'
import StatusSimulator from './components/StatusSimulator.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',  // Home.vue がうまく表示されなかったのでコメントアウト
  routes: [
    { path: '/', component: Home },
    { path: '/dragon-gift', component: DragonGifts },
    { path: '/void-battle', component: VoidBattles },
    { path: '/status-simulator', component: StatusSimulator },
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
