import * as VueRouter from 'vue-router'
import empleado from './pages/Empleado/empleado.vue' 
import crearUsuario from './pages/Empleado/crearUsuario.vue' 

const routes = [
    { path: '/', component: empleado },
    { path: '/empleado', component: empleado },
    { path:'/empleado/formulario', component: crearUsuario}
  ]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router; //Utilizarlo en otro archivo