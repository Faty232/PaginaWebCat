 <template>
    <div class="contenedor">
            <h2 class="v-title">{{ title }}</h2>
            <form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field label="Nombre" v-model="form.nombre" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Descripcion" v-model="form.descripcion" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Color" v-model="form.color" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Talla" v-model="form.talla" required></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field label="Precio" v-model="form.precio" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select :items="estatuses" v-model="form.estatus" label="Estatus" item-text="text" item-value="value" required></v-select>
                        </v-col>
                        <v-col>
                            <v-select :items="tipoPrendaT" item-text="nombre" item-value="id" v-model="form.TipoPrendaId" label="Tipo de Prenda" required></v-select>
                        </v-col>
                        <v-col>
                            <v-select :items="categoriaT" item-text="nombre" item-value="id" v-model="form.CategoriumId" label="Categoria" required></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-select :items="proveedorT" item-text="nombre" item-value="id" v-model="form.ProveedorId" label="Proveedor" required></v-select>
                        </v-col>
                        <v-col>
                            <v-select :items="marcaT" item-text="nombre" item-value="id" v-model="form.MarcaId" label="Marca" required></v-select>
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
                estatuses: [
                   {
                        value: true , 
                        text: 'Disponible'
                   },
                   {
                        value: false,
                        text: 'No disponible'
                   } 
                ],
                form: {
                    nombre: '',
                    descripcion: '',
                    color: '',
                    talla: '',
                    precio: '',
                    estatus: '',
                    TipoPrendaId: '',
                    CategoriumId: '',
                    ProveedorId: '',
                    MarcaId: ''
                },
                tipoPrendaT: [],
                categoriaT: [],
                proveedorT: [],
                marcaT: []
            }
        }, 
        computed: {
            title(){
                return this.$route.params.id ? 'Editar Producto' : 'Crear Producto'
            },
            btnText(){
                return this.$route.params.id ? 'Editar' : 'Guardar'
            }
        },
        created(){
            if(this.$route.params.id)
                this.getProducto()
                this.getTipoPrendas ()
                this.getCategorias ()
                this.getProveedores()
                this.getMarcas()
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
                    url: 'http://localhost:8888/api/producto',
                    data: this.form
                }).then( resp => {
                    alert(resp.data.message)
                    this.$router.push({ name: 'productos' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            editar(){
                axios({
                    method: 'put',
                    url: `http://localhost:8888/api/producto/${this.$route.params.id}`,
                    data: this.form
                }).then( resp => {
                     console.log(resp);
                    alert(resp.data.message)
                    this.$router.push({ name: 'productos' })
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getProducto(){
                axios({
                    method: 'get',
                    url: `http://localhost:8888/api/producto/${this.$route.params.id}`
                }).then( resp => {
                    this.form.nombre = resp.data.nombre
                    this.form.descripcion = resp.data.descripcion
                    this.form.color = resp.data.color
                    this.form.talla = resp.data.talla
                    this.form.precio = resp.data.precio
                    this.form.estatus = resp.data.estatus
                    this.form.TipoPrendaId = resp.data.TipoPrendaId
                    this.form.CategoriumId = resp.data.CategoriumId
                    this.form.ProveedorId = resp.data.ProveedorId
                    this.form.MarcaId = resp.data.MarcaId
                    this.producto = producto
                } ).catch( err => {
                    console.log(err)
                } )
            },
            getTipoPrendas(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/tipoPrenda'
            }).then( resp => {
                this.tipoPrendaT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getCategorias(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/categoria'
            }).then( resp => {
                this.categoriaT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getProveedores(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/proveedor'
            }).then( resp => {
                this.proveedorT = resp.data
            } ).catch( err => {
                console.log(err)
            } )
        },
         getMarcas(){
            axios({
                method: 'get',
                url: 'http://localhost:8888/api/marca'
            }).then( resp => {
                this.marcaT = resp.data
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