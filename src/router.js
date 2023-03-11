import Vue from 'vue'
import Router from 'vue-router'

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

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'login', component: Login },
        { path: '/empleados', name: 'empleados', component: Empleados },
        { path: '/empleados/crear', name: 'crearEmpleado', component: CrearEmpleado },
        { path: '/empleados/editar/:id', name: 'editarEmpleado', component: EditarEmpleado },
        
        { path: '/distribuidores', name: 'distribuidores', component: Distribuidores },
        { path: '/distribuidores/crear', name: 'crearDistribuidor', component: CrearDistribuidor },
        { path: '/distribuidores/editar/:id', name: 'editarDistribuidor', component: CrearDistribuidor },

        { path: '/clientes', name: 'clientes', component: Clientes },
        { path: '/clientes/crear', name: 'crearCliente', component: CrearEditarCliente },
        { path: '/clientes/editar/:id', name: 'editarCliente', component: CrearEditarCliente },

        { path: '/marcas', name: 'marcas', component: Marcas },

        { path: '/tipo-prendas', name: 'tipoPrendas', component: TipoPrendas },

        { path: '/categorias', name: 'categorias', component: Categorias },

        { path: '/proveedores', name: 'proveedores', component: Proveedores },
        { path: '/proveedores/crear', name: 'crearProveedor', component: CrearEditarProveedor },
        { path: '/proveedores/editar/:id', name: 'editarProveedor', component: CrearEditarProveedor },

        { path: '/productos', name: 'productos', component: Productos },
        { path: '/productos/crear', name: 'crearProducto', component: CrearEditarProducto },
        { path: '/productos/editar/:id', name: 'editarProducto', component: CrearEditarProducto },

        { path: '/almacenes', name: 'almacenes', component: Almacenes },
        { path: '/almacenes/crear', name: 'crearAlmacen', component: CrearEditarAlmacen },
        { path: '/almacenes/editar/:id', name: 'editarAlmacen', component: CrearEditarAlmacen }
    ]
})

export default router