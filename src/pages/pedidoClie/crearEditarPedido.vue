<template>
    <div class="contenedor">
            <h2 class="v-title">{{ title }}</h2>
            <form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field label="Fecha de Entrega" v-model="form.fechEnt" type="date" required></v-text-field>
                        </v-col>
                        <v-col>
                             <v-select :items="estatus" v-model="form.estatus" label="Estatus" required></v-select>
                         </v-col>
                        <v-col>
                            <v-text-field label="Envio" v-model="form.envio" type="number" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Cantidad" v-model="form.cantidad" type="number" required></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col>
                             <v-select :items="empleadoT" item-text="nombre" item-value="id" v-model="form.EmpleadoId" label="Empleado" required></v-select>
                        </v-col>
                        <v-col>
                             <v-select :items="distribuidorT" item-text="nombre" item-value="id" v-model="form.DistribuidorId" label="Distribuidor" required></v-select>
                        </v-col>
                        <v-col>
                            <v-select :items="clienteT" item-text="nombre" item-value="id" v-model="form.ClienteId" label="Cliente" required></v-select>
                        </v-col>
                        <v-col>
                            <v-select :items="direEntT" item-text="direccion" item-value="id" v-model="form.DireEntId" label="Dirección de Entrega" required></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="5">
                            <v-select :items="productoT" item-text="nombre" item-value="id" v-model="form.ProductoId" label="Producto" required></v-select>
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
                estatus: ['pendiente', 'finalizado', 'cancelado'],
                form: {
                    fechEnt: '',
                    estatus: '',
                    envio: '',
                    cantidad: '',
                    EmpleadoId: '',
                    DistribuidorId: '',
                    ClienteId: '',
                    DireccionId: '',
                    ProductoId: ''
                },
                empleadoT: [],
                distribuidorT: [],
                clienteT: [],
                direEntT: [],
                productoT: []
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Pedido' : 'Crear Pedido'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id){
                this.getPedido()
            }
                this.getEmpleados()
                this.getDistribuidores ()
                this.getClientes ()
                this.getDireEnt()
                this.getProductos()
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
                    url: `${process.env.RUTA_DB}/pedidoClie`,
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'pedidos' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `${process.env.RUTA_DB}/pedidoClie/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                     console.log(resp);
                    alert(resp.data.message)
                    this.$router.push({ name: 'pedidos' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getPedidos(){
                axios({
                    method: 'get',
                    url: `${process.env.RUTA_DB}/pedidoClie/${this.$route.params.id}`
                }).then( resp => {
                    this.form.fechEnt = resp.data.fechEnt
                    this.form.estatus = resp.data.estatus
                    this.form.envio = resp.data.envio
                    this.form.cantidad = resp.data.cantidad
                    this.form.EmpleadoId = resp.data.EmpleadoId
                    this.form.DistribuidorId = resp.data.DistribuidorId
                    this.form.ClienteId = resp.data.ClienteId
                    this.form.DireEntId = resp.data.DireEntId
                    this.form.ProductoId = resp.data.ProductoId
                    this.pedidoClie = pedidoClie
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getPedido(){
                axios({
                    method: 'get',
                    url: `${process.env.RUTA_DB}/pedidoClie/${this.$route.params.id}`
                }).then( resp => {
                    this.form.fechEnt = resp.data.fechEnt
                    this.form.estatus = resp.data.estatus
                    this.form.envio = resp.data.envio
                    this.form.cantidad = resp.data.cantidad
                    this.form.EmpleadoId = resp.data.EmpleadoId
                    this.form.DistribuidorId = resp.data.DistribuidorId
                    this.form.ClienteId = resp.data.ClienteId
                    this.form.DireEntId = resp.data.DireEntId
                    this.form.ProductoId = resp.data.ProductoId
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getEmpleados(){
            axios({
                method: 'get',
                url: `${process.env.RUTA_DB}/empleado`
            }).then( resp => {
                this.empleadoT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getDistribuidores(){
            axios({
                method: 'get',
                url: `${process.env.RUTA_DB}/distribuidor`
            }).then( resp => {
                this.distribuidorT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getClientes(){
            axios({
                method: 'get',
                url: `${process.env.RUTA_DB}/cliente`
            }).then( resp => {
                this.clienteT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getDireEnt(){
            axios({
                method: 'get',
                url: `${process.env.RUTA_DB}/direEnt`
            }).then( resp => {
                this.direEntT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getProductos(){
            axios({
                method: 'get',
                url: `${process.env.RUTA_DB}/producto`
            }).then( resp => {
                this.productoT = resp.data
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