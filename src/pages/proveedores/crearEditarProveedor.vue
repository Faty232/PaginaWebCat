<template>
    <div class="contenedor">
        <h2 class="v-title">{{ title }}</h2>
        <form @submit.prevent="submit">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label="Nombre" v-model="form.nombre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Telefono" v-model="form.telefono" type="number" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="Tipo" v-model="form.tipo"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Municipio" v-model="form.municipio" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-text-field label="Correo" v-model="form.email" type = "email" required></v-text-field>
                    </v-col>
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
                    nombre: '',
                    telefono: '',
                    tipo: '',
                    municipio: '',
                    email: ''
                }
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Proveedor' : 'Crear Proveedor'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getProveedor()
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
                    url: `${import.meta.env.VITE_RUTA_DB}/proveedor`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'proveedores' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_RUTA_DB}/proveedor/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'proveedores' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getProveedor(){
                axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_RUTA_DB}/proveedor/${this.$route.params.id}`
                }).then( resp => {
                    this.form.nombre = resp.data.nombre
                    this.form.telefono = resp.data.telefono
                    this.form.tipo = resp.data.tipo
                    this.form.municipio = resp.data.municipio
                    this.form.email = resp.data.email
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