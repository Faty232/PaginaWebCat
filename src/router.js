import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

import Login from './pages/login.vue'
import Empleados from './pages/empleados/empleados.vue'
import CrearEmpleado from './pages/empleados/crearEmpleado.vue'
import EditarEmpleado from './pages/empleados/editarEmpleado.vue'
import Distribuidores from './pages/distribuidores/distribuidores.vue'
import CrearDistribuidor from './pages/distribuidores/crearEditarDistribuidor.vue'
import Clientes from './pages/clientes/clientes.vue'
import CrearEditarCliente from './pages/clientes/crearEditarCliente.vue'
import Marcas from './pages/marcas.vue'
import TipoPrendas from './pages/tipoPrendas.vue'
import Categorias from './pages/categorias.vue'
import Proveedores from './pages/proveedores/proveedores.vue'
import CrearEditarProveedor from './pages/proveedores/crearEditarProveedor.vue'
import Productos from './pages/productos/productos.vue'
import CrearEditarProducto from './pages/productos/crearEditarProducto.vue'
import Almacenes from './pages/almacenes/almacenes.vue'
import CrearEditarAlmacen from './pages/almacenes/crearEditarAlmacen.vue'
import DireccionesEnt from './pages/direccionesEnt/direccionesEnt.vue'
import CrearEditarDireccion from './pages/direccionesEnt/crearEditarDireccion.vue'
import Devoluciones from './pages/devoluciones/devoluciones.vue'
import CrearEditarDevolucion from './pages/devoluciones/CrearEditarDevolucion.vue'
import PedidoClie from './pages/pedidoClie/pedidoClie.vue'
import CrearEditarPedido from './pages/pedidoClie/crearEditarPedido.vue'
console.log(CrearEditarPedido);
const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'login', component: Login, meta:{
            emailValidate: false
        }  },
        { path: '/empleados', name: 'empleados', component: Empleados, meta:{
            emailValidate: true
        } },
        { path: '/empleados/crear', name: 'crearEmpleado', component: CrearEmpleado, meta:{
            emailValidate: true
        } }, 
        { path: '/empleados/editar/:id', name: 'editarEmpleado', component: EditarEmpleado, meta:{
            emailValidate: true
        } }, 
        
        { path: '/distribuidores', name: 'distribuidores', component: Distribuidores, meta:{
            emailValidate: true
        } },
        { path: '/distribuidores/crear', name: 'crearDistribuidor', component: CrearDistribuidor, meta:{
            emailValidate: true
        } },
        { path: '/distribuidores/editar/:id', name: 'editarDistribuidor', component: CrearDistribuidor, meta:{
            emailValidate: true
        } },

        { path: '/clientes', name: 'clientes', component: Clientes, meta:{
            emailValidate: true
        } },
        { path: '/clientes/crear', name: 'crearCliente', component: CrearEditarCliente, meta:{
            emailValidate: true
        } },
        { path: '/clientes/editar/:id', name: 'editarCliente', component: CrearEditarCliente, meta:{
            emailValidate: true
        } },

        { path: '/marcas', name: 'marcas', component: Marcas, meta:{
            emailValidate: true
        } },

        { path: '/tipo-prendas', name: 'tipoPrendas', component: TipoPrendas, meta:{
            emailValidate: true
        } },

        { path: '/categorias', name: 'categorias', component: Categorias, meta:{
            emailValidate: true
        } },

        { path: '/proveedores', name: 'proveedores', component: Proveedores, meta:{
            emailValidate: true
        } },
        { path: '/proveedores/crear', name: 'crearProveedor', component: CrearEditarProveedor, meta:{
            emailValidate: true
        } },
        { path: '/proveedores/editar/:id', name: 'editarProveedor', component: CrearEditarProveedor, meta:{
            emailValidate: true
        } },

        { path: '/productos', name: 'productos', component: Productos, meta:{
            emailValidate: true
        } },
        { path: '/productos/crear', name: 'crearProducto', component: CrearEditarProducto, meta:{
            emailValidate: true
        } },
        { path: '/productos/editar/:id', name: 'editarProducto', component: CrearEditarProducto },

        { path: '/almacenes', name: 'almacenes', component: Almacenes, meta:{
            emailValidate: true
        } },
        { path: '/almacenes/crear', name: 'crearAlmacen', component: CrearEditarAlmacen, meta:{
            emailValidate: true
        } },
        { path: '/almacenes/editar/:id', name: 'editarAlmacen', component: CrearEditarAlmacen, meta:{
            emailValidate: true
        } },

        { path: '/direccionesEnt', name: 'direcciones', component: DireccionesEnt, meta:{
            emailValidate: true
        } },
        { path: '/direccionesEnt/crear', name: 'crearDireccion', component: CrearEditarDireccion, meta:{
            emailValidate: true
        } },
        { path: '/direccionesEnt/editar/:id', name: 'editarDireccion', component: CrearEditarDireccion, meta:{
            emailValidate: true
        } },

        { path: '/devoluciones', name: 'devoluciones', component: Devoluciones, meta:{
            emailValidate: true
        } },
        { path: '/devoluciones/crear', name: 'crearDevolucion', component: CrearEditarDevolucion, meta:{
            emailValidate: true
        } },
        { path: '/devoluciones/editar/:id', name: 'editarDevolucion', component: CrearEditarDevolucion, meta:{
            emailValidate: true
        }},

        { path: '/pedidoClie', name: 'pedidos', component: PedidoClie, meta:{
            emailValidate: true
        } },
        { path: '/pedidoClie/crear', name: 'crearPedido', component: CrearEditarPedido, meta:{
            emailValidate: true
        } },
        { path: '/pedidoClie/editar/:id', name: 'editarPedido', component: CrearEditarPedido, meta:{
            emailValidate: true
        }}
    ]
})

router.beforeEach(async (to, from, next)=> {
    const token =Vue.localStorage.get("token")
    console.log(token, to.meta.emailValidate)
    if(token){
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_RUTA_DB}/login/${token}`
        }).then( resp => {
            console.log('----', resp);
            if (!to.meta.emailValidate) next({ name: 'empleados' })
            else next()
        } ).catch( err => {
            console.log(err)
            Vue.localStorage.remove('token')
            next({ name: 'login' })
        } )
    } else if (!token && to.meta.emailValidate) 
        next({ name: 'login' })
    else next()
})




export default router