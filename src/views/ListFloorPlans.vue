<template>
  <div>
    <NavBar/>
    <v-container class="justify-center align-center">
      <v-row class="ma-2 pa-2">
        <v-spacer></v-spacer>

        <label class="custom-file-upload">

          <div>
            <v-icon>mdi-upload</v-icon>
            อัพโหลดแปลนห้อง
          </div>
          <input
            id="file-upload"
            type="file"
            ref="files"
            multiple
            @change="uploadSelectedFiles"
            accept="image/png, image/jpeg"
          />
        </label>
      </v-row>

      <v-row class="ma-2 pa-2">

        <template v-for="floor_plan in this.floor_plans">

          <v-card
            :key="floor_plan.id"
            @click="router(`/floor_plans/${floor_plan.id}`)"
            class="mx-auto mt-5"
          >
            <v-img
              :src="floor_plan.image_url"
              height="200px"
            ></v-img>

            <v-card-title>
              {{ floor_plan.name }}
            </v-card-title>

          </v-card>
        </template>
      </v-row>
    </v-container>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import {mapActions, mapState} from 'vuex';

export default {
  name: "ListFloorPlans",
  components: {
    NavBar
  },
  data: () => ({

    files: [],

    form: new FormData,

  }),
  methods: {
    load: async function () {

      await this.$store.dispatch('project/getFloorPlansByProjectId', {
        project_id: this.$route.params.project_id
      })

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
  },
  computed: {
    ...mapActions('project', ['getFloorPlansByProjectId', 'uploadFloorPlansByProjectId']),
    ...mapState('project', ['floor_plans'])
  },
  created() {
    this.load()
  },

}
</script>

<style scoped>

</style>
