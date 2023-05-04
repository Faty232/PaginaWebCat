<template>
    <div class="contenedor">
        <h2 class="v-title">Crear Empleado</h2>
        <form @submit.prevent="guardar">
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

                <v-row>
                    <v-col cols="6">
                        <v-text-field label="Contraseña" type="password" v-model="form.contraseña" required></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row justify="center">
                    <v-btn type="submit" color="primary">Guardar</v-btn>
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
                    telefono: '',
                    contraseña: ''
                }
            }
        },
        methods: {
            guardar(){
                axios({
                    method: 'post',
                    url: `${process.env.RUTA_DB}/empleado`,
                    data: this.form
                }).then( resp => {
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