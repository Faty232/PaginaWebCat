<template>
    <div class="contenedor">
        <h2 class="v-title">Pedidos</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearPedido' })">
                Crear pedido
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="pedidos">
            <template v-slot:item.EmpleadoId="{item}">
                    {{item.Empleado ? item.Empleado.nombre :""}}
            </template>
            <template v-slot:item.DistribuidorId="{item}">
                {{item.Distribuidor ? item.Distribuidor.nombre :""}}
            </template>
            <template v-slot:item.ClienteId="{item}">
                {{item.Cliente ? item.Cliente.nombre :""}}
            </template>
            <template v-slot:item.DireEntId="{item}">
                {{item.DireEnt ? item.DireEnt.direccion :""}}
            </template>
             <template v-slot:item.ProductoId="{item}">
                {{item.Producto ? item.Producto.nombre :""}}
            </template>
            <template v-slot:item.precio="{item}">
                {{item.Producto ? item.Producto.precio :""}}
            </template>
            <template v-slot:item.total="{item}">
                {{item.Producto ? item.Producto.precio*item.cantidad :""}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarPedido', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deletePedido(item.id)">
                    <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios'
     import {
        mdiPencil,
        mdiDelete,
    } from '@mdi/js'
    export default{
        data(){
            return{
                headers: [
                    { text: 'Fecha de Entrega', value: 'fechEnt' },
                    { text: 'Estatus', value: 'estatus' },
                    { text: 'Envio', value: 'envio' },
                    { text: 'Precio', value: 'precio' },
                    { text: 'Cantidad', value: 'cantidad' },
                    { text: 'Total', value: 'total' },
                    { text: 'Empleado', value: 'EmpleadoId' },
                    { text: 'Distribuidor', value: 'DistribuidorId' },
                    { text: 'Cliente', value: 'ClienteId' },
                    { text: 'Dirección de Entrega', value: 'DireEntId' },
                    { text: 'Producto', value: 'ProductoId' },
                    { text: 'Fecha Creación', value: 'createdAt' },
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                pedidos: []
            }
        },
        mounted(){
            this.getPedidos()
        },
        methods: {
            getPedidos(){
                axios.get(`${import.meta.env.VITE_RUTA_DB}/pedidoClie`).then( resp => {
                    this.pedidos = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deletePedido(id){
                axios({
                    method: 'delete',
                    url: `${import.meta.env.VITE_RUTA_DB}/pedidoClie/${id}`
                }).then( resp => {
                    this.getPedidos()
                    alert(resp.data.message)
                } ).catch( err => {
                    console.log(err)
                } )
            }
        }
    }
</script>

<style>
.contenedor{
    padding: 30px 0;
}
.v-title{
    text-align: center;
    font-size: 40px;
    margin-bottom: 20px;
}
</style>