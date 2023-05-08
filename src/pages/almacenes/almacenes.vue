<template>
    <div class="contenedor">
        <h2 class="v-title">Almacenes</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearAlmacen' })">
                Crear almacen
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="almacenes">
            <template v-slot:item.ProductoId="{item}">
                    {{item.Producto ? item.Producto.id:""}}
            </template> 
            <template v-slot:item.ProductoNombre="{item}">
                    {{item.Producto ? item.Producto.nombre :""}}
            </template> 
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarAlmacen', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteAlmacen(item.id)">
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
                    { text: 'Existencias', value: 'existencias' },
                    { text: 'Id Producto', value: 'ProductoId' },    
                    { text: 'Producto', value: 'ProductoNombre' },     
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                almacenes: []
            }
        },
        mounted(){
            this.getAlmacenes()
        },
        methods: {
            getAlmacenes(){
                axios.get(`${import.meta.env.VITE_RUTA_DB}/almacen`).then( resp => {
                    this.almacenes = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteAlmacen(id){
                axios({
                    method: 'delete',
                    url: `${import.meta.env.VITE_RUTA_DB}/almacen/${id}`
                }).then( resp => {
                    this.getAlmacenes()
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