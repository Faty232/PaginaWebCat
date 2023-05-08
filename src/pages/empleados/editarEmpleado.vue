<template>
    <div class="contenedor">
        <h2 class="v-title">Editar Empleado</h2>
        <form @submit.prevent="editar">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label="Nombre" v-model="form.nombre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Edad" v-model="form.edad" type="number" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-switch label="Administrador" v-model="form.administrador"></v-switch>
                    </v-col>
                    <v-col>
                        <v-text-field label="Dirección" v-model="form.direccion" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="CP" v-model="form.cp" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select :items="estados" v-model="form.estado" label="Estados" required></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="Correo" v-model="form.email" type="email" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Telefono" v-model="form.telefono" required></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row justify="center">
                    <v-btn type="submit" color="primary">Editar</v-btn>
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
                    edad: '',
                    administrador: false,
                    direccion: '',
                    cp: '',
                    estado: '',
                    email: '',
                    telefono: ''
                }
            }
        },
        created(){
            this.getEmpleado()
        },
        methods: {
            getEmpleado(){
                axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_RUTA_DB}/empleado/${this.$route.params.id}`
                }).then( resp => {
                    this.form.nombre = resp.data.nombre
                    this.form.edad = resp.data.edad
                    this.form.administrador = resp.data.administrador
                    this.form.direccion = resp.data.direccion
                    this.form.cp = resp.data.cp
                    this.form.estado = resp.data.estado
                    this.form.email= resp.data.email
                    this.form.telefono= resp.data.telefono
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'patch',
                    url: `${import.meta.env.VITE_RUTA_DB}/empleado/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    console.log(resp)
                    alert(resp.data.message)
                    this.$router.push({ name: 'empleados' })
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