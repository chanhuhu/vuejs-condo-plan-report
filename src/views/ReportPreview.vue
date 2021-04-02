<template>
  <div>

    <NavBar/>
    <v-container>
      <transition>
        <keep-alive>
          <div v-html="templ" v-if="templ"></div>
          <div v-else>คุณยังไม่ได้สร้างรายการแก้ไข หรือ แปลน</div>
        </keep-alive>
      </transition>
    </v-container>
  </div>

</template>

<script>
import {ApiClient} from "../plugins/axios";
import NavBar from "../components/NavBar";

export default {
  name: "ReportPreview",
  components: {NavBar},
  data: () => ({
    templ: null
  }),
  methods: {
    createOverallReport: async function () {
      await ApiClient.get(`/projects/${this.$route.params.project_id}/create_overall_report`).then(res => {
        const {data} = res
        this.templ = data
        console.log(data)
      })

    },
  },
  created() {
    this.createOverallReport()
  },
  computed: {
    reportPreviewComponent() {
      return {template: this.templ}
    }

  }
}
</script>

<style scoped>

</style>
