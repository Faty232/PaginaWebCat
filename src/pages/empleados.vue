<template>
    <div class="contenedor">
        <h2 class="v-title">Empleados</h2>
        <v-data-table :headers="headers" :items="empleados">
            <template v-slot:item.direccion="{ item }">
                {{ `${item.direccion}, ${item.estado}, ${item.cp}`}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="primary"
                >
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
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