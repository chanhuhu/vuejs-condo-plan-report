<template>
  <div>
    <NavBar/>
    <v-row class="ma-2 pa-2">
      <v-spacer></v-spacer>

      <label class="custom-file-upload">
        <v-row>
          <v-icon>mdi-upload</v-icon>
          แก้ไขแปลนห้องโดยการอัพโหลดใหม่
        </v-row>
        <v-row>
          <input
            id="file-upload"
            type="file"
            ref="files"
            multiple
            @change="editFloorPlanBySelectedFile()"
            accept="image/png, image/jpeg"
          />
        </v-row>
      </label>

    </v-row>
  </div>
</template>

<script>
import NavBar from "../components/NavBar"
import {ApiClient} from "../plugins/axios";

export default {
  name: "EditFloorPlan",
  components: {
    NavBar
  },
  data: () => ({
    form: new FormData(),
    files: []
  }),
  methods: {
    editFloorPlanBySelectedFile: async function () {
      this.form = new FormData();
      const files = this.$refs.files.files;
      this.files = [...files];


      for (let i = 0; i < this.files.length; i++) {
        this.form.append('files[]', this.files[i]);
      }

      await (
        (async () => {
          await ApiClient.put(`/floor_plans/${this.$route.params.floor_plan_id}`).then(res => {
            const {data} = res
            console.log(data)
          }
        )

        })()
      )


      this.$refs.files.value = ''
    },
  }
}
</script>

<style scoped>

</style>
