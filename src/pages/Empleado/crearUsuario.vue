<template>
    <v-form @submit="guardar">
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="formulario.nombre"
                    label="Nombre" required
                    density="comfortable"
                    ></v-text-field>    
                </v-col>
                 <v-col>
                    <v-text-field
                    v-model="formulario.edad"
                    label="Edad" required
                    density="comfortable"
                    ></v-text-field>    
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-switch
                    v-model="formulario.administrador"
                    label="Administrador"
                    color="info"
                    density="comfortable"
                    hide-details
                    ></v-switch>
                </v-col>
                 <v-col>
                    <v-text-field
                    v-model="formulario.direccion"
                    label="Direccion" required
                    density="comfortable"
                    ></v-text-field>    
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="formulario.cp"
                    label="CP" required
                    density="comfortable"
                    ></v-text-field>    
                </v-col>
                 <v-col>
                    <v-select
                    v-model="formulario.estado"
                    :items="estados"
                    label="Estado"
                    density="comfortable"
                    ></v-select>   
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                        <v-text-field
                        v-model="formulario.email"
                        label="Email" required
                        density="comfortable"
                        ></v-text-field>    
                    </v-col>
                    <v-col>
                        <v-text-field
                        v-model="formulario.telefono"
                        label="Telefono" required
                        density="comfortable"
                        ></v-text-field> 
                    </v-col>
            </v-row>
            <v-row>
                    <v-col>
                        <v-text-field
                        v-model="formulario.contraseña"
                        type="password"
                        label="Contraseña" required
                        density="comfortable"
                        ></v-text-field>    
                    </v-col>
            </v-row>
            <v-row justify="center">
                <v-btn
                flat
                color="secondary"
                >
                GUARDAR
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
    import axios from "axios"
    export default{
        data(){
            return{
                estados:["Jalisco", "Nayarit", "Guanajuato"],
                formulario:{
                    nombre: "",
                    edad: "",
                    administrador: false,
                    direccion: "",
                    cp: "",
                    email: "",
                    telefono: "",
                    contraseña: ""
                }
            }
        },
        methods:{
            guardar(){
                axios.post('http://localhost:8888/api/empleado', this.formulario)
                .then((response) => {
                    this.empleado = response.data
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>