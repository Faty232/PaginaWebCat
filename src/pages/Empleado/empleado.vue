<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Nombre</th>
        <th class="text-left">Edad</th>
        <th class="text-left">Administrador</th>
        <th class="text-left">Direccion</th>
        <th class="text-left">CP</th>
        <th class="text-left">Estado</th>
        <th class="text-left">Email</th>
        <th class="text-left">Telefono</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="item in empleado" :key="item.id">
     <td>{{ item.nombre }}</td>
     <td>{{ item.edad }}</td>
     <td>{{ item.administrador }}</td>
     <td>{{ item.direccion }}</td>
     <td>{{ item.cp }}</td>
     <td>{{ item.estado }}</td>
     <td>{{ item.email }}</td>
     <td>{{ item.telefono }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
  import axios from "axios"
  export default {
    data(){
      return{
        empleado:[]
      }
    },
    mounted() {
          axios.get('http://localhost:8888/api/empleado')
      .then((response) => {
        this.empleado = response.data
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
</script>