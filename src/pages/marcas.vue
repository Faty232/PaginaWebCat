<template>
    <div class="contenedor">
        <h2 class="v-title">Marcas</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="openModal = true">
                Crear Marca
            </v-btn>
        </v-row>
        <v-dialog
            v-model="openModal"
            persistent
            max-width="300px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Nombre" v-model="form.nombre" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-row justify="space-between" :style="{ margin: 0 }">
                        <v-btn color="blue darken-1" text @click="openModal = false; marca = {}">
                            Cerrar
                        </v-btn>
                        <v-btn color="primary" @click="submit">
                            {{ btnText }}
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col :cols="4" :key="marca.id" v-for="marca in marcas">
                <v-card elevation="2">
                    <v-card-title :style="{ fontWeight: 'bold', fontSize: '30px' }">{{ marca.nombre }}</v-card-title>
                    <v-card-actions>
                        <v-row justify="space-between" :style="{ margin: 0 }">
                            <v-btn tile color="success" small @click="edit(marca)">
                                <v-icon left>
                                    {{ icons.mdiPencil }}
                                </v-icon>
                                    Editar
                            </v-btn>
                            <v-btn tile color="error" small @click="deleteMarca(marca.id)">
                                <v-icon left>
                                    {{ icons.mdiDelete }}
                                </v-icon>
                                    Eliminar
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import {
        mdiPencil,
        mdiDelete,
    } from '@mdi/js'

export default {
    data(){
        return{
            openModal: false,
            form: {
                nombre: ''
            },
            icons: {
                mdiPencil,
                mdiDelete
            },
            marca: {},
            marcas: []
        }
    },
    computed: {
        title(){
            return this.marca.id ? 'Editar Marca' : 'Crear Marca'
        },
        btnText(){
            return this.marca.id ? 'Editar' : 'Guardar'
        }
    },
    created(){
        this.getMarcas()
    },
    methods: {
        edit(marca){
            this.openModal = true
            this.marca = marca
            this.form.nombre = marca.nombre
        },
        submit(){
            if(this.marca.id) 
                this.editMarca(this.marca.id)
            else
                this.guardar()
        },
        getMarcas(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/marca'
            }).then( resp => {
                this.marcas = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
        guardar(){
            axios({
                method: 'post',
                url: 'http://localhost:8888/api/marca',
                data: this.form
            }).then( resp => {
                this.getMarcas()
                alert(resp.data.message)
                this.form.nombre = ''
                this.openModal = false
            } ).catch( err => {
                console.log(err)
            } )
        },
        deleteMarca(id){
            axios({
                method: 'delete',
                url: `http://localhost:8888/api/marca/${id}`
            }).then( resp => {
                this.getMarcas()
                alert(resp.data.message)
            } ).catch( err => {
                console.log(err)
            } )
        },
        editMarca(id){
            axios({
                method: 'put',
                url: `http://localhost:8888/api/marca/${id}`,
                data: this.form
            }).then( resp => {
                this.getMarcas()
                this.openModal = false
                this.marca = {}
                this.form.nombre = ''
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