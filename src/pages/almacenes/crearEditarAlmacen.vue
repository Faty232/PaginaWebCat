<template>
    <div class="contenedor">
        <h2 class="v-title">{{ title }}</h2>
        <form @submit.prevent="submit">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field  label="Existencias" v-model="form.existencias" type="number" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select :items="productoT" item-text="nombre" item-value="id" v-model="form.ProductoId" label="Producto" required></v-select>
                    </v-col>
                </v-row>
                    <v-col cols=6>
                        <v-select :items="productoT" item-text="id" item-value="id" v-model="form.ProductoId" label="Id Producto" required></v-select>
                    </v-col>
                <v-row>

                </v-row>
                
                <v-row justify="center">
                    <v-btn type="submit" color="primary">{{ btnText }}</v-btn>
                </v-row>
            </v-container>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                form: {
                    existencias: '',
                    ProductoId: '',
                },
                productoT: []
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Almacen' : 'Crear Almacen'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getAlmacen()
                this.getProductos()
        },
        methods: {
            submit(){
                if(this.$route.params.id) 
                    this.editar()
                else
                    this.guardar()
            },
            guardar(){
                axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_RUTA_DB}/almacen`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'almacenes' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_RUTA_DB}/almacen/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'almacenes' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getAlmacen(){
                axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_RUTA_DB}/almacen/${this.$route.params.id}`
                }).then( resp => {
                    this.form.existencias = resp.data.existencias
                    this.form.ProductoId = resp.data.ProductoId
                    this.almacen = almacen
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getProductos(){
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_RUTA_DB}/producto`
            }).then( resp => {
                this.productoT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
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