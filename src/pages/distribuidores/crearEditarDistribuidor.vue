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
                        <v-text-field label="Correo" type="email" v-model="form.email"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Municipio" v-model="form.municipio" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-select :items="estados" v-model="form.estado" label="Estados" required></v-select>
                    </v-col>
                    <v-col>
                        <v-text-field label="CP" v-model="form.cp" type="number" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-text-field label="Fecha entrega" type="date" v-model="form.fechaEnt" required></v-text-field>
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
                estados: ['Jalisco', 'Michoacan', 'Gerrero', 'Ciudad de mexico'],
                form: {
                    nombre: '',
                    telefono: '',
                    email: '',
                    municipio: '',
                    estado: '',
                    cp: '',
                    fechaEnt: ''
                }
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Distribuidor' : 'Crear Distribuidor'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getDistribuidor()
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
                    url: 'http://localhost:8888/api/distribuidor',
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'distribuidores' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `http://localhost:8888/api/distribuidor/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'distribuidores' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getDistribuidor(){
                axios({
                    method: 'get',
                    url: `http://localhost:8888/api/distribuidor/${this.$route.params.id}`
                }).then( resp => {
                    this.form.nombre = resp.data.nombre
                    this.form.telefono = resp.data.telefono
                    this.form.email = resp.data.email
                    this.form.municipio = resp.data.municipio
                    this.form.estado = resp.data.estado
                    this.form.cp = resp.data.cp
                    this.form.fechaEnt= resp.data.fechaEnt
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