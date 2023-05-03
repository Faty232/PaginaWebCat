import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Vue from 'vue'
import 'vuetify/dist/vuetify.css'
import App from './App.vue'
import vuetify from './vuetify'
import router from './router'

dotenv.config()
Vue.use(vuetify)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
