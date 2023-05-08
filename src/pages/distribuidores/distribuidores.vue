<template>
    <div class="contenedor">
        <h2 class="v-title">Distribuidores</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearDistribuidor' })">
                Crear distribuidor
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="distribuidores">
            <template v-slot:item.direccion="{ item }">
                {{ `${item.estado}, ${item.municipio}, ${item.cp}`}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarDistribuidor', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteDistribuidor(item.id)">
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
                    { text: 'Dirección', value: 'direccion' },
                    { text: 'Email', value: 'email' },
                    { text: 'Telefono', value: 'telefono' },
                    { text: 'Fecha Entrega', value: 'fechaEnt' },
                    { text: 'Fecha Creación', value: 'createdAt' },
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                distribuidores: []
            }
        },
        mounted(){
            this.getDistribuidores()
        },
        methods: {
            getDistribuidores(){
                axios.get(`${import.meta.env.VITE_RUTA_DB}/distribuidor`).then( resp => {
                    this.distribuidores = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteDistribuidor(id){
                axios({
                    method: 'delete',
                    url: `${import.meta.env.VITE_RUTA_DB}/distribuidor/${id}`
                }).then( resp => {
                    this.getDistribuidores()
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