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
        <v-btn
          v-if="$route.fullPath.includes('/projects/*/create_overall_report')"
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
          <div style="color: white">KornInspect</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
<!--        <a href="http://localhost:8000/static/report.pdf"> test</a>-->
        <v-btn
          v-if="$route.fullPath.includes('/projects/')"
          text
          color="white"
          v-ripple
          @click="downloadOverallReport()"
          dense
        >

          <v-icon class="mx-2">mdi-download</v-icon>
          <div class="flex-wrap">
            ดาวน์โหลด pdf ที่ถูกพรีวีวไปแล้ว
          </div>
        </v-btn>
      </v-toolbar>
    </div>


  </v-card>
</template>
<script>
import {ApiClient} from "../plugins/axios";

export default {
  name: 'NavBar',
  methods: {
    downloadOverallReport: async function () {
      ApiClient({
        url: `/static/report.pdf`,
        responseType: "blob",
        method: "GET",
        baseURL: 'http://localhost:8000'
      }).then(res => {
        const {data} = res
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();

      })
    }
  }
}

</script>
