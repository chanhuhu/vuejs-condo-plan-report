<template>
  <v-card flat>
    <div>

      <v-toolbar
          flat
          color="blue"
      >
        <v-btn
            v-if="$route.fullPath.includes('/projects/')"
            @click="$router.go(-1)"
            icon
            color="white"
        >
          <v-icon
              dense
          >mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-btn
            v-if="$route.fullPath.includes('/floor_plans')"
            @click="$router.go(-1)"
            icon
            color="white"
        >
          <v-icon
              dense
          >mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text">
          <div style="color: white">แอปสำหรับการจัดการแปลนคอนโด</div>
        </v-toolbar-title>
      </v-toolbar>
    </div>


  </v-card>
</template>
<script>
export default {
  name: 'NavBar'
}
</script>