<template>
    <div class="contenedor">
        <h2 class="v-title">Devoluciones</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearDevolucion' })">
                Crear devolución
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="devoluciones">
            <template v-slot:item.PedidoClieId="{item}">
                    {{item.PedidoClie ? item.PedidoClie.id:""}}
            </template> 
            <template v-slot:item.precio="{item}">
                    {{item.PedidoClie ? item.PedidoClie.precio:""}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarDevolucion', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteDevolucion(item.id)">
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
                    { text: 'Estatus', value: 'estatus' },
                    { text: 'Motivo', value: 'motivo' },  
                    { text: 'Cantidad', value: 'cantidad' }, 
                    { text: 'Precio', value: 'precio' }, 
                    { text: 'Total', value: 'total' }, 
                    { text: 'Id Pedido Cliente', value: 'PedidoClieId' },      
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                devoluciones: []
            }
        },
        mounted(){
            this.getDevoluciones()
        },
        methods: {
            getDevoluciones(){
                axios.get(`${process.env.RUTA_DB}/devolucion`).then( resp => {
                    this.devoluciones = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteDevolucion(id){
                axios({
                    method: 'delete',
                    url: `${process.env.RUTA_DB}/devolucion/${id}`
                }).then( resp => {
                    this.getDevoluciones()
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