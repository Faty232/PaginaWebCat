<template>
    <div class="contenedor">
        <h2 class="v-title">Productos</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="$router.push({ name: 'crearProducto' })">
                Crear producto
            </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="productos">
            <template v-slot:item.TipoPrendaId="{item}">
                    {{item.TipoPrenda ? item.TipoPrenda.nombre :""}}
            </template>
            <template v-slot:item.CategoriumId="{item}">
                {{item.Categorium ? item.Categorium.nombre :""}}
            </template>
            <template v-slot:item.ProveedorId="{item}">
                {{item.Proveedor ? item.Proveedor.nombre :""}}
            </template>
            <template v-slot:item.MarcaId="{item}">
                {{item.Marca ? item.Marca.nombre :""}}
            </template>
            <template  v-slot:item.editar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="primary"  @click="$router.push({ name: 'editarProducto', params: { id: item.id }  })">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
            </template>
            <template  v-slot:item.eliminar="{ item }">
                <v-btn class="mx-2" fab dark x-small color="error" @click="deleteProducto(item.id)">
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
                    { text: 'Descripción', value: 'descripcion' },
                    { text: 'Color', value: 'color' },
                    { text: 'Talla', value: 'talla' },
                    { text: 'Precio', value: 'precio' },
                    { text: 'Estatus', value: 'estatus' },
                    { text: 'Tipo de Prenda', value: 'TipoPrendaId' },
                    { text: 'Categoria', value: 'CategoriumId' },
                    { text: 'Proveedor', value: 'ProveedorId' },
                    { text: 'Marca', value: 'MarcaId' },
                    { text: 'Fecha Creación', value: 'createdAt' },
                    { text: '', value: 'editar' },
                    { text: '', value: 'eliminar' },
                ],
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                productos: []
            }
        },
        mounted(){
            this.getProductos()
        },
        methods: {
            getProductos(){
                axios.get('http://localhost:8888/api/producto').then( resp => {
                    this.productos = resp.data
                    console.log(resp)
                } ).catch( err => {
                    console.log(err)
                } )
            },
            deleteProducto(id){
                axios({
                    method: 'delete',
                    url: `http://localhost:8888/api/producto/${id}`
                }).then( resp => {
                    this.getProductos()
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