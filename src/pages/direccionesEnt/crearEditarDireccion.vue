<template>
    <div class="contenedor">
        <h2 class="v-title">{{ title }}</h2>
        <form @submit.prevent="submit">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label="Dirección" v-model="form.direccion" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Código Postal" v-model="form.cp" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select :items="estados" v-model="form.estado" label="Estados" required></v-select>
                    </v-col>
                </v-row>
                    <v-col cols="5">
                        <v-select :items="clienteT" item-text="nombre" item-value="id" v-model="form.ClienteId" label="Cliente" required></v-select>
                    </v-col>
                <v-row>

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
                    direccion: '',
                    cp: '',
                    estado: '',
                    ClienteId: '',
                },
                clienteT: []
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Direccion Entrega' : 'Crear Direccion Entrega'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getDireEnt()
                this.getClientes()
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
                    url: `${import.meta.env.VITE_RUTA_DB}/direEnt`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'direcciones' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_RUTA_DB}/direEnt/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'direcciones' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getDireEnt(){
                axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_RUTA_DB}/direEnt/${this.$route.params.id}`
                }).then( resp => {
                    this.form.direccion = resp.data.direccion
                    this.form.cp = resp.data.cp
                    this.form.estado = resp.data.estado
                    this.form.ClienteId = resp.data.ClienteId
                    this.direEnt = direEnt
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getClientes(){
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_RUTA_DB}/cliente`
            }).then( resp => {
                this.clienteT = resp.data
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