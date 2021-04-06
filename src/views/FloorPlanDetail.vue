<template>
  <div>
    <NavBar/>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img
            class="d-block"
            :src="floor_plan.image_url"
            height="300px"
          ></v-img>
        </v-col>
      </v-row>

      <v-form
        ref="form"
        @submit.prevent="clickToCreateNewIssue"
        v-model="valid"
        lazy-validation
      >
        <v-row justify="space-between" align="center">

          <v-col cols="12">

            <v-text-field
              type="text"
              v-model="name"
              :rules="newIssueRules"
              label="ลายเอียดจุดซ่อม"
              required
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="description"
              :rules="newIssueRules"
              label="หมายเหตุ"
              required
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="location"
              :rules="newIssueRules"
              label="ตำแหน่งจุดเสีย"
              required
            ></v-text-field>
            <v-row dense>
              <v-col cols="12">


                <label class="custom-file-upload">

                  <v-icon>mdi-upload</v-icon>
                  อัพโหลดรูปประกอบรายการแก้ไข
                  <input
                    id="file-upload"
                    type="file"
                    ref="files"
                    @change="selectedFile"
                    accept="image/png, image/jpeg"
                  />
                </label>

                <v-btn
                  type="submit"
                  v-ripple
                  class="primary"
                >เพิ่มรายการแก้ไข
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <div>รายการแก้ไขทั้งหมดในแปลนห้อง</div>
            <template v-for="(issue, issueIdx) in this.issues">

              <v-card
                :key="issue.id"
                class="mx-auto mt-5"
                style="position: relative"
              >
                <v-col cols="12">
                  <v-btn @click="clickToDeleteIssue(issue.id,issueIdx)" style="position: absolute;top: 0;right: 0"
                         class="ma-2 pa-2">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>

                  <div class="d-flex flex-no-wrap justify-space-between">
                    <v-avatar
                      class="ma-3"
                      size="125"
                      tile
                    >
                      <v-img :src="issue.url"></v-img>
                    </v-avatar>
                    <v-row dense>
                      <v-col>

                        <v-card-title
                          class="headline"
                        >รายละเอียด:
                        </v-card-title>
                        <v-card-text>หมายเหตุ:</v-card-text>
                        <v-card-text>ที่ตั้ง:</v-card-text>
                      </v-col>
                      <v-col>
                        <v-card-title
                          class="headline"
                          v-text="issue.name"
                        ></v-card-title>
                        <v-card-text style="color: red">{{ issue.description }}</v-card-text>
                        <v-card-subtitle v-text="issue.location"></v-card-subtitle>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>

              </v-card>
            </template>
          </v-col>
        </v-row>

      </v-form>

    </v-container>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import {ApiClient} from "../plugins/axios";


export default {
  name: "FloorPlanDetail",
  components: {
    NavBar
  },
  data: () => ({
    valid: true,
    name: "หน้าบานถลอก",
    location: 'ห้องน้ำ 2',
    description: 'รอเปลี่ยน',
    newIssueRules: [
      v => !!v || 'กรุณากรอกละเอียดจุดเสีย',
    ],
    files: [],
    old_issues: [],
    issues: [],
    floor_plan: {}


  }),
  computed: {},
  methods: {
    clickToDeleteIssue: async function (issue_id, issueIdx) {
      this.issues.splice(issueIdx, 1)
      await ApiClient.delete(`/issues/${issue_id}`).then(res => {
        const {data} = res
        console.log(data)
      }).catch(err => console.log(err))


    },
    clickToCreateNewIssue: async function () {
      const newIssue = new FormData()
      const newData = {
        name: this.name,
        description: this.description,
        location: this.location
      }
      console.log(JSON.stringify(newData))
      if (this.files.length > 0) {
        newIssue.append('data', JSON.stringify(newData))
        newIssue.append('files[]', this.files[0])
        await this.createNewIssue(newIssue);
      }


      await this.getIssuesByFloorPlanId()

      console.log(this.files)

    },
    selectedFile: async function () {
      const files = this.$refs.files.files;
      this.files = [...files];
    },
    load: async function () {
      await this.getFloorPlanDetail()
      await this.getIssuesByFloorPlanId()

    },
    getIssuesByFloorPlanId: async function () {
      await ApiClient.get(`/floor_plans/${this.$route.params.floor_plan_id}/issues`).then(res => {
        const {data} = res
        this.issues = data
      }).catch(err => console.log(err))
    },
    getFloorPlanDetail: async function () {
      await ApiClient.get(`/floor_plans/${this.$route.params.floor_plan_id}`).then(
        res => {
          const {data} = res
          this.floor_plan = data
        }
      ).catch(err => console.log(err))
    },
    createNewIssue: async function (payload) {
      await ApiClient.post(`/floor_plans/${this.$route.params.floor_plan_id}/issues`, payload).then(res => console.log(res))
    },
  },
  created() {
  },
  mounted() {
    this.load()
  }

}
</script>

<style scoped>

</style>
