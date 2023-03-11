<template>
    <div class="contenedor">
        <h2 class="v-title">Proveedores</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearProveedor' })">
                Crear proveedor
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="proveedores">
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarProveedor', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteProveedor(item.id)">
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
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Telefono', value: 'telefono' },
                    { text: 'Tipo', value: 'tipo' },
                    { text: 'Municipio', value: 'municipio' },
                    { text: 'Email', value: 'email' },
                    { text: 'Fecha Creación', value: 'createdAt' },
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                proveedores: []
            }
        },
        mounted(){
            this.getProveedores()
        },
        methods: {
            getProveedores(){
                axios.get('http://localhost:8888/api/proveedor').then( resp => {
                    this.proveedores = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteProveedor(id){
                axios({
                    method: 'delete',
                    url: `http://localhost:8888/api/proveedor/${id}`
                }).then( resp => {
                    this.getProveedores()
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