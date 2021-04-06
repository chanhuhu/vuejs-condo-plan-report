import Vue from 'vue'
import VueRouter from 'vue-router'
import ListProjects from '../views/ListProjects.vue'
import ListFloorPlans from "../views/ListFloorPlans";
import FloorPlanDetail from "../views/FloorPlanDetail";
import ReportPreview from "../views/ReportPreview";
import EditFloorPlan from "../views/EditFloorPlan";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/projects'
  },
  {
    path: '/projects',
    name: 'ListProjects',
    component: ListProjects
  },
  {
    path: '/projects/:project_id',
    name: 'ListFloorPlans',
    component: ListFloorPlans
  },
  {
    path: '/floor_plans/:floor_plan_id',
    name: 'FloorPlanDetail',
    component: FloorPlanDetail
  },
  {
    path: '/projects/:project_id/create_overall_report',
    name: 'ReportPreview',
    component: ReportPreview
  },
  {
    path: '/floor_plans/:floor_plan_id/edit',
    name: "EditFloorPlan",
    component: EditFloorPlan
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
