import Vue from 'vue'
import VueRouter from 'vue-router'
import ListProjects from '../views/ListProjects.vue'
import ListFloorPlans from "../views/ListFloorPlans";
import FloorPlanDetail from "../views/FloorPlanDetail";

Vue.use(VueRouter)

const routes = [
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
