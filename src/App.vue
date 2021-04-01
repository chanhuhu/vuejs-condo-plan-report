<template>
  <v-app>
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

    <v-main>
      <v-container>

        <v-form
          ref="form"
          @submit.prevent="clickToCreateProject"
          v-model="valid"
          lazy-validation
        >
          <v-row justify="space-between" align="center">

            <v-col>

              <v-text-field
                type="text"
                v-on:keydown.enter.prevent="clickToCreateProject"
                v-model="newProject"
                :rules="newProjectRules"
                label="ชื่อโครงการใหม่"
                required
              ></v-text-field>
            </v-col>

            <v-col>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="clickToCreateProject"
              >
                สร้างโครงการใหม่
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',


  data: () => ({
    valid: true,
    newProject: 'site 1',
    newProjectRules: [
      v => !!v || 'Name is required',
    ],
  }),
  methods: {
    ...mapActions('project', ["createProject", "getProjects", 'renameProject', "getProject"]),
    clickToCreateProject: async function () {
      await this.$refs.form.validate()
      await this.createProject({
        name: this.newProject
      })
      await this.$refs.form.reset()
    }
  },
  computed: {},
  mounted() {
  },
  created() {
    this.getProjects();
  }
};
</script>
