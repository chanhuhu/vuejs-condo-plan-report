<template>
  <div>
    <NavBar/>
    <v-container class="justify-center align-center">
      <v-form @submit.prevent="clickToRenameProject()">
        <v-row class="ma-2 pa-2 d-flex justify-center align-center">
          <v-col cols="12">
            <label @click="toggleIsDisabled" style="cursor: pointer">
              <v-icon>mdi-pencil</v-icon>
              เปลี่ยนชื่อโปรเจค
            </label>
            <v-text-field ref="input" type="text" v-model="new_project.name"
                          :disabled="isDisabled"></v-text-field>

          </v-col>
        </v-row>
        <v-row class="ma-2 pa-2 d-flex justify-center align-center">
          <v-btn block class="primary" type="submit">เปลี่ยน</v-btn>
        </v-row>
      </v-form>
      <v-row class="ma-2 pa-2">
        <v-spacer></v-spacer>

        <label class="custom-file-upload">
          <v-row>
            <v-icon>mdi-upload</v-icon>
            อัพโหลดแปลนห้อง
          </v-row>
          <v-row>
            <input
              id="file-upload"
              type="file"
              ref="files"
              multiple
              @change="uploadSelectedFiles"
              accept="image/png, image/jpeg"
            />
          </v-row>
        </label>

      </v-row>

      <v-row class="ma-2 pa-2">

        <template v-for="(floor_plan,floorPlanIdx) in this.floor_plans">

          <v-card
            style="position: relative"
            :key="floor_plan.id"
            class="mx-auto mt-5"
          >
            <v-row justify="center">
              <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">

                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    dark
                    v-on="on"
                    style="position: absolute;right: 0;top: 0; font-size: 16px; z-index: 1;"
                    class="primary pa-2 ma-2">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">เปลี่ยนชื่อแปลนห้อง</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            label="ชื่อแปลนห้อง"
                            v-model="new_floor_plan"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="clickToRenameFloorPlan(floor_plan.id)"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            <v-img
              class="d-block"
              :src="floor_plan.image_url"
              height="200px"
            ></v-img>

            <v-row>
              <v-col cols="12" class="d-flex justify-space-between align-center ">
                <v-card-title style="cursor: pointer" @click="router(`/floor_plans/${floor_plan.id}`)">
                  {{ floor_plan.name }}
                </v-card-title>
                <v-btn @click="clickToDeleteFloorPlan(floor_plan.id, floorPlanIdx)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>

          </v-card>
        </template>
      </v-row>
    </v-container>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import {mapActions, mapState} from 'vuex';
import {ApiClient} from "../plugins/axios";

export default {
  name: "ListFloorPlans",
  components: {
    NavBar
  },
  data: () => ({
    new_floor_plan: 'test',
    dialog: false,
    isDisabled: true,

    files: [],

    form: new FormData,
    new_project: {
      name: ''
    }

  }),
  methods: {
    clickToRenameFloorPlan: async function(floor_plan_id) {
      await ApiClient.put(`/floor_plans/${floor_plan_id}`, {
        name: this.new_floor_plan
      })
      await this.load()
      this.dialog = false
    },
    focusInput: async function () {
      this.$refs.input.focus()

    },
    toggleIsDisabled: async function () {
      this.isDisabled = !this.isDisabled
      await this.focusInput()
    },
    load: async function () {
      await ApiClient.get(`/projects/${this.$route.params.project_id}`).then(res => {
          const {data} = res
          this.new_project.name = data.name
        }
      )

      await this.$store.dispatch('project/getFloorPlansByProjectId', {
        project_id: this.$route.params.project_id
      })

    },
    clickToDeleteFloorPlan: async function (floor_plan_id, floorPlanIdx) {
      await ApiClient.delete(`/floor_plans/${floor_plan_id}`).then(res => {
        const {data} = res
        console.log(data)
      })
      this.floor_plans.splice(floorPlanIdx, 1)


    },
    router: async function (link) {
      await this.$router.push(link);
    },
    uploadSelectedFiles: async function () {
      this.form = new FormData();
      const files = this.$refs.files.files;
      this.files = [...files];


      for (let i = 0; i < this.files.length; i++) {
        this.form.append('files[]', this.files[i]);
      }


      await this.$store.dispatch(`project/uploadFloorPlansByProjectId`, {
        project_id: this.$route.params.project_id,
        form: this.form
      })

      this.$refs.files.value = ''
      await this.load()
    },
    clickToRenameProject: async function () {
      await this.$store.dispatch('project/renameProject', {
        project_id: this.$route.params.project_id,
        updates: {
          name: this.project.name
        }
      })

    }
  },
  computed: {
    ...mapActions('project', ['getFloorPlansByProjectId', 'uploadFloorPlansByProjectId', 'renameProject']),
    ...mapState('project', ['floor_plans', 'project']),


  },
  created() {
    this.load()
  },
  mounted() {
  }

}
</script>

<style scoped>

</style>
