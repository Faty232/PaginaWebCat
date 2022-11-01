import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from './pages/login.vue'
import Empleados from './pages/empleados/empleados.vue'
import CrearEmpleado from './pages/empleados/crearEmpleado.vue'

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'login', component: Login },
        { path: '/empleados', name: 'empleados', component: Empleados },
        { path: '/empleados/crear', name: 'crearEmpleado', component: CrearEmpleado }
    ]
})

export default router