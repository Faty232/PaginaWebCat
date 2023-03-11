<template>
    <div class="contenedor">
        <h2 class="v-title">Clientes</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearCliente' })">
                Crear cliente
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="clientes">
            <template v-slot:item.direccion="{ item }">
                {{ `${item.direccion}, ${item.estado}, ${item.colonia}, ${item.cp}`}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarCliente', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteCliente(item.id)">
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
                    { text: 'Tipo', value: 'tipo' },
                    { text: 'Dirección', value: 'direccion' },            
                    { text: 'Email', value: 'email' },
                    { text: 'Telefono', value: 'telefono' },
                    { text: 'Fecha Creación', value: 'createdAt' },
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                clientes: []
            }
        },
        mounted(){
            this.getClientes()
        },
        methods: {
            getClientes(){
                axios.get('http://localhost:8888/api/cliente').then( resp => {
                    this.clientes = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteCliente(id){
                axios({
                    method: 'delete',
                    url: `http://localhost:8888/api/cliente/${id}`
                }).then( resp => {
                    this.getClientes()
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