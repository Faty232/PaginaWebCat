<template>
    <div class="contenedor">
        <h2 class="v-title">{{ title }}</h2>
        <form @submit.prevent="submit">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field  label="Estatus" v-model="form.estatus"required></v-text-field>
                    </v-col>
                     <v-col>
                        <v-text-field  label="Motivo" v-model="form.motivo"required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field  label="Cantidad" v-model="form.cantidad" type="number"required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field  label="Total" v-model="form.total" type="number" required></v-text-field>
                    </v-col>
                </v-row>
                    <v-col cols=6>
                        <v-select :items="pedidoClieT" item-text="id" item-value="id" v-model="form.PedidoClieId" label="Id Pedido Cliente" required></v-select>
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
                form: {
                    estatus: '',
                    motivo: '',
                    cantidad: '',
                    total: '',
                    PedidoClieId: ''
                },
                pedidoClieT: []
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Devolución' : 'Crear Devolución'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getDevolucion()
                this.getPedidos()
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
                    url: 'http://localhost:8888/api/devolucion',
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'devoluciones' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `http://localhost:8888/api/devolucion/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'devoluciones' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getDevolucion(){
                axios({
                    method: 'get',
                    url: `http://localhost:8888/api/devolucion/${this.$route.params.id}`
                }).then( resp => {
                    this.form.estatus = resp.data.estatus
                    this.form.motivo = resp.data.motivo
                    this.form.cantidad = resp.data.cantidad
                    this.form.total = resp.data.total
                    this.form.PedidoClieId = resp.data.PedidoClieId
                    this.devolucion = devolucion
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getPedidos(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/pedidoClie'
            }).then( resp => {
                this.pedidoClieT = resp.data
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