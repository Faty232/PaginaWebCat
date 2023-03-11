<template>
    <div class="contenedor">
        <h2 class="v-title">Categorias</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="openModal = true">
                Crear Categoria 
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
                    <v-text-field label="Descripcion" v-model="form.descripcion" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-row justify="space-between" :style="{ margin: 0 }">
                        <v-btn color="blue darken-1" text @click="openModal = false; categoria = {}">
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
            <v-col :cols="4" :key="categoria.id" v-for="categoria in categorias">
                <v-card elevation="2">
                    <v-card-title :style="{ fontWeight: 'bold', fontSize: '30px' }">{{ categoria.nombre }}</v-card-title>
                    <v-card-text :style="{fontSize: '20px' }">
                       <p :style="{marginBottom: 0}">{{categoria.descripcion }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="space-between" :style="{ margin: 0 }">
                            <v-btn tile color="success" small @click="edit(categoria)">
                                <v-icon left>
                                    {{ icons.mdiPencil }}
                                </v-icon>
                                    Editar
                            </v-btn>
                            <v-btn tile color="error" small @click="deleteCategoria(categoria.id)">
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
                nombre: '',
                descripcion: ''
            },
            icons: {
                mdiPencil,
                mdiDelete
            },
            categoria: {},
            categorias: []
        }
    },
    computed: {
        title(){
            return this.categoria.id ? 'Editar Categoria' : 'Crear Categoria'
        },
        btnText(){
            return this.categoria.id ? 'Editar' : 'Guardar'
        }
    },
    created(){
        this.getCategorias()
    },
    methods: {
        edit(categoria){
            this.openModal = true
            this.categoria = categoria
            this.form.nombre = categoria.nombre
            this.form.descripcion = categoria.descripcion
        },
        submit(){
            if(this.categoria.id) 
                this.editCategoria(this.categoria.id)
            else
                this.guardar()
        },
        getCategorias(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/categoria'
            }).then( resp => {
                this.categorias = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
        guardar(){
            axios({
                method: 'post',
                url: 'http://localhost:8888/api/categoria',
                data: this.form
            }).then( resp => {
                this.getCategorias()
                alert(resp.data.message)
                this.form.nombre = ''
                this.form.descripcion = ''
                this.openModal = false
            } ).catch( err => {
                console.log(err)
            } )
        },
        deleteCategoria(id){
            axios({
                method: 'delete',
                url: `http://localhost:8888/api/categoria/${id}`
            }).then( resp => {
                this.getCategorias()
                alert(resp.data.message)
            } ).catch( err => {
                console.log(err)
            } )
        },
        editCategoria(id){
            axios({
                method: 'put',
                url: `http://localhost:8888/api/categoria/${id}`,
                data: this.form
            }).then( resp => {
                this.getCategorias()
                this.openModal = false
                this.categoria = {}
                this.form.nombre = ''
                this.form.descripcion = ''
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