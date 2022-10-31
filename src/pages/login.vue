<template>
    <v-container :style="{ height: '100vh' }">
        <v-row  align="center" justify="center" :style="{ height: '100%' }">
            <v-card :style="{ width: '90%', maxWidth: '300px' }">
                <v-card-title>
                    <h2 :style="{ margin: '1rem auto 1rem auto' }">Iniciar sessión</h2>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Cuenta"></v-text-field>
                    <v-text-field label="Contraseña" ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" :style="{ margin: '0 auto 1rem auto', minWidth: '120px' }">Entrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    
    export default{
        data(){
            return{

            }
        },
        methods: {
            login(){

            }
        }
    }
</script>