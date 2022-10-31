import Vue from 'vue'
import 'vuetify/dist/vuetify.css'
import App from './App.vue'
import vuetify from './vuetify'
import router from './router'


Vue.use(vuetify)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
