<template>
  <div>
    <NavBar/>

    <v-container>


      <v-form
        ref="form"
        @submit.prevent="clickToCreateNewProject"
        v-model="valid"
        lazy-validation
      >
        <v-row justify="space-between" align="center">

          <v-col>

            <v-text-field
              type="text"
              v-on:keydown.enter.prevent="clickToCreateNewProject"
              v-model="newProject"
              :rules="newProjectRules"
              label="ชื่อโครงการใหม่"
              required
              append-icon="mdi-plus"
            ></v-text-field>
          </v-col>
        </v-row>

      </v-form>

      <template v-for="project in this.projects">
        <v-card :key="project.id" tile style="height: auto">

          <v-card-title @click="router(`/projects/${project.id}`)" style="cursor: pointer" class="headline">
            {{ project.name }}
          </v-card-title>


        </v-card>

      </template>
    </v-container>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import {mapActions, mapState} from "vuex";

export default {
  name: 'ListProjects',
  components: {
    NavBar,
  },
  data: () => ({
    valid: true,
    newProject: 'site 1',
    newProjectRules: [
      v => !!v || 'กรุณากรอกชื่อโครงการ',
    ],
  }),
  methods: {
    ...mapActions('project', ["createProject", "getProjects", 'renameProject', "getProject"]),
    clickToCreateNewProject: async function () {
      await this.$refs.form.validate()
      await this.createProject({
        name: this.newProject
      })
      await this.$refs.form.reset()
      await this.load();
    },
    load: async function () {
      await this.getProjects();
    },
    router: async function (link) {
      await this.$router.push(link);
    }
  },
  computed: {
    ...mapState('project', ['projects'])
  },
  mounted() {
  },
  created() {
    this.load()
  }
}
</script>
