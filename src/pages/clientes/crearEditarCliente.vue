<template>
    <div class="contenedor">
        <h2 class="v-title">{{ title }}</h2>
        <form @submit.prevent="submit">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field  label="Nombre" v-model="form.nombre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Tipo" v-model="form.tipo" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="Direccion" v-model="form.direccion"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Colonia" v-model="form.colonia" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="CP" type="number" v-model="form.cp"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select :items="estados" v-model="form.estado" label="Estados" required></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="Correo" type="email" v-model="form.email" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Telefono" type="number" v-model="form.telefono" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Contraseña" type="password" v-model="form.contraseña" required></v-text-field>
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
                    tipo: '',
                    direccion: '',
                    colonia: '',
                    cp: '',
                    estado: '',
                    email: '',
                    telefono: '',
                    contraseña: ''
                }
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Cliente' : 'Crear Cliente'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getCliente()
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
                    url: `${import.meta.env.VITE_RUTA_DB}/cliente`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'clientes' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_RUTA_DB}/cliente/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'clientes' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getCliente(){
                axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_RUTA_DB}/cliente/${this.$route.params.id}`
                }).then( resp => {
                    this.form.nombre = resp.data.nombre
                    this.form.tipo = resp.data.tipo
                    this.form.direccion = resp.data.direccion
                    this.form.colonia = resp.data.colonia
                    this.form.cp = resp.data.cp
                    this.form.estado = resp.data.estado
                    this.form.email = resp.data.email
                    this.form.telefono= resp.data.telefono
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