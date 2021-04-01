<template>
  <!--  <v-img-->
  <!--    :src="floor_plan.image_url"-->
  <!--    height="200px"-->
  <!--  ></v-img>-->
  <div>
    <NavBar/>
    <v-container>

      <v-form
        ref="form"
        @submit.prevent="clickToCreateNewIssue"
        v-model="valid"
        lazy-validation
      >
        <v-row justify="space-between" align="center">

          <v-col>

            <v-text-field
              type="text"
              v-model="newData.name"
              :rules="newIssueRules"
              label="ลายเอียดจุดซ่อม"
              required
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="newData.description"
              :rules="newIssueRules"
              label="หมายเหตุ"
              required
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="newData.location"
              :rules="newIssueRules"
              label="ตำแหน่งจุดเสีย"
              required
            ></v-text-field>
          </v-col>
        </v-row>

      </v-form>

    </v-container>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "FloorPlanDetail",
  components: {
    NavBar
  },
  data: () => ({
    valid: true,
    newIssueRules: [
      v => !!v || 'กรุณากรอกละเอียดจุดเสีย',
    ],
    newIssue: new FormData,
    newData:
      {"name": "", "description": "", "location": ""}
    ,
    files: []

  }),
  methods: {
    clickToCreateNewIssue: () => {
      // this.newIssue = new FormData()
      // console.log(JSON.stringify(this.newData))
      // console.log(this.files)

    }
  },
  created() {
    // this.clickToCreateNewIssue()
  },
  mounted() {
    // this.clickToCreateNewIssue()
  }

}
</script>

<style scoped>

</style>
