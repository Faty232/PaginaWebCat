<template>
    <div class="contenedor">
        <h2 class="v-title">Tipo de Prendas</h2>
        <v-row justify="end" :style="{ marginBottom: '20px' }">
            <v-btn class="mx-2"  color="primary" @click="openModal = true">
                Crear Tipo de Prenda
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
                    <v-select :items="tipo" v-model="form.genero" label="Genero" required></v-select>
                    <v-text-field label="Temporada" v-model="form.temporada" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-row justify="space-between" :style="{ margin: 0 }">
                        <v-btn color="blue darken-1" text @click="openModal = false; tipoPrenda = {}">
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
            <v-col :cols="4" :key="tipoPrenda.id" v-for="tipoPrenda in tipoPrendas">
                <v-card elevation="2">
                    <v-card-title :style="{ fontWeight: 'bold', fontSize: '30px' }">{{ tipoPrenda.nombre }}</v-card-title>
                    <v-card-text :style="{fontSize: '20px' }">
                       <p :style="{marginBottom: 0}">{{ tipoPrenda.genero }}</p>
                       <p>{{ tipoPrenda.temporada}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="space-between" :style="{ margin: 0 }">
                            <v-btn tile color="success" small @click="edit(tipoPrenda)">
                                <v-icon left>
                                    {{ icons.mdiPencil }}
                                </v-icon>
                                    Editar
                            </v-btn>
                            <v-btn tile color="error" small @click="deleteTipoPrenda(tipoPrenda.id)">
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
            tipo: ['M', 'F', 'U'],
            openModal: false,
            form: {
                nombre: '',
                genero: '',
                temporada: ''
            },
            icons: {
                mdiPencil,
                mdiDelete
            },
            tipoPrenda: {},
            tipoPrendas: []
        }
    },
    computed: {
        title(){
            return this.tipoPrenda.id ? 'Editar Tipo de Prenda' : 'Crear Tipo de Prenda'
        },
        btnText(){
            return this.tipoPrenda.id ? 'Editar' : 'Guardar'
        }
    },
    created(){
        this.getTipoPrendas()
    },
    methods: {
        edit(tipoPrenda){
            this.openModal = true
            this.tipoPrenda = tipoPrenda
            this.form.nombre = tipoPrenda.nombre
            this.form.genero = tipoPrenda.genero
            this.form.temporada = tipoPrenda.temporada
        },
        submit(){
            if(this.tipoPrenda.id) 
                this.editTipoPrenda(this.tipoPrenda.id)
            else
                this.guardar()
        },
        getTipoPrendas(){
            axios({
                method: 'get',
                url: `${process.env.RUTA_DB}/tipoPrenda`
            }).then( resp => {
                this.tipoPrendas = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
        guardar(){
            axios({
                method: 'post',
                url: `${process.env.RUTA_DB}/tipoPrenda`,
                data: this.form
            }).then( resp => {
                this.getTipoPrendas()
                alert(resp.data.message)
                this.form.nombre = ''
                this.form.genero = ''
                this.form.temporada = ''
                this.openModal = false
            } ).catch( err => {
                console.log(err)
            } )
        },
        deleteTipoPrenda(id){
            axios({
                method: 'delete',
                url: `${process.env.RUTA_DB}/tipoPrenda/${id}`
            }).then( resp => {
                this.getTipoPrendas()
                alert(resp.data.message)
            } ).catch( err => {
                console.log(err)
            } )
        },
        editTipoPrenda(id){
            axios({
                method: 'put',
                url: `${process.env.RUTA_DB}/tipoPrenda/${id}`,
                data: this.form
            }).then( resp => {
                this.getTipoPrendas()
                this.openModal = false
                this.tipoPrenda = {}
                this.form.nombre = ''
                this.form.genero = ''
                this.form.temporada = ''
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