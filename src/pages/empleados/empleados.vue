<template>
    <div class="contenedor">
        <h2 class="v-title">Empleados</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearEmpleado' })">
                Crear usuario
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="empleados">
            <template v-slot:item.direccion="{ item }">
                {{ `${item.direccion}, ${item.estado}, ${item.cp}`}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarEmpleado', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteEmpleado(item.id)">
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
                    { text: 'Edad', value: 'edad' },
                    { text: 'Administrador', value: 'administrador' },
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
                empleados: []
            }
        },
        mounted(){
            this.getEmpleados()
        },
        methods: {
            getEmpleados(){
                axios.get('http://localhost:8888/api/empleado').then( resp => {
                    this.empleados = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteEmpleado(id){
                axios({
                    method: 'delete',
                    url: `http://localhost:8888/api/empleado/${id}`
                }).then( resp => {
                    this.getEmpleados()
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