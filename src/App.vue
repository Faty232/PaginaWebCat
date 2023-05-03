<template>
  <div id="app">
    <v-app :style="{ minHeight: '100vh' }"> 
      <v-main>
        <v-row :style="{ height: '100%' }">
          <v-col cols="auto" v-if="$route.name !== 'login'" :style="{ padding: 0 }">
            <v-card class="mx-auto" width="330" :style="{height: '100%'}">
              <v-navigation-drawer
                permanent
                width="100%"
              >
                <v-row
                  class="fill-height"
                  no-gutters
                >
                  <v-navigation-drawer
                    dark
                    mini-variant
                    mini-variant-width="56"
                    permanent
                  >
                    <v-list-item class="px-2">
                      <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-divider></v-divider>
                    
                    <v-list
                      dense
                      nav
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Empleados</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-navigation-drawer>

                  <v-list class="grow">
                    <v-list-item>
                      <v-list-item-title v-text="'Inicio'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'empleados' })">
                      <v-list-item-title v-text="'Empleados'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'clientes' })">
                      <v-list-item-title v-text="'Clientes'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'distribuidores' })">
                      <v-list-item-title v-text="'Distribuidores'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'proveedores' })">
                      <v-list-item-title v-text="'Proveedores'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'productos' })">
                      <v-list-item-title v-text="'Productos'"></v-list-item-title>
                    </v-list-item>
                     <v-list-item @click="$router.push({ name: 'pedidos' })">
                      <v-list-item-title v-text="'Pedidos Clientes'"></v-list-item-title>
                    </v-list-item>
                     <v-list-item @click="$router.push({ name: 'direcciones' })">
                      <v-list-item-title v-text="'Dirección Entrega'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'devoluciones' })">
                      <v-list-item-title v-text="'Devoluciones'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'almacenes' })">
                      <v-list-item-title v-text="'Almacen'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'marcas' })">
                      <v-list-item-title v-text="'Marcas'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'categorias' })">
                      <v-list-item-title v-text="'Categorias'"></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push({ name: 'tipoPrendas' })">
                      <v-list-item-title v-text="'Tipo de Prendas'"></v-list-item-title>
                    </v-list-item>
                  </v-list>

                </v-row>
              </v-navigation-drawer>
            </v-card>
          </v-col>
          <v-col :style="{ paddingLeft: '40px', paddingRight: '40px' }">
            <router-view />
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </div>
</template>