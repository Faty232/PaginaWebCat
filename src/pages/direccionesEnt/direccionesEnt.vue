<template>
    <div class="contenedor">
        <h2 class="v-title">Dirección Entrega</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearDireccion' })">
                Crear dirección de entrega
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="direccionesEnt">
            <template v-slot:item.ClienteNombre="{item}">
                    {{item.Cliente ? item.Cliente.nombre :""}}
            </template> 
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarDireccion', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteDireccion(item.id)">
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
                    { text: 'Direccion', value: 'direccion' },
                    { text: 'Código postal', value: 'cp' },
                    { text: 'Estado', value: 'estado' },   
                    { text: 'Cliente', value: 'ClienteNombre' },     
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                direccionesEnt: []
            }
        },
        mounted(){
            this.getDireccionesEnt()
        },
        methods: {
            getDireccionesEnt(){
                axios.get('http://localhost:8888/api/direEnt').then( resp => {
                    this.direccionesEnt = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteDireccion(id){
                axios({
                    method: 'delete',
                    url: `http://localhost:8888/api/direEnt/${id}`
                }).then( resp => {
                    this.getDireccionesEnt()
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