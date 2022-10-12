<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col :style="{maxWidth:'300px'}">
          <v-card>
            <v-layout>
              <v-navigation-drawer permanent rail>
                <v-list>
                  <v-list-item
                      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                      title="Fatima Ramirez"
                      subtitle="sandra_a88@gmailcom"
                  ></v-list-item>
                </v-list>
                <v-divider></v-divider>
              </v-navigation-drawer>
              <v-navigation-drawer permanent>
              <v-list density="compact" nav> 
                <v-list-item prepend-icon="mdi-star" title="empleado" value="empleado"></v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-layout>
          </v-card>
        </v-col>
        <v-col>
          <v-app>
            <router-view></router-view>
          </v-app>
        </v-col>
     </v-row>
   </v-container>
</template>

<script>
export default {}
</script>

