import {ApiClient} from "../plugins/axios";


const state = {
  project: { /*
      {
         "id": "01575c94-c06f-40bb-8170-e4c742be1907",
         "name": "site 1",
         "created_at": "2021-04-01T08:13:03.643412Z",
         "updated_at": "2021-04-01T08:13:03.643479Z"
       }
  */
  },
  projects: {
    /*
     [
      {
         "id": "01575c94-c06f-40bb-8170-e4c742be1907",
         "name": "site 1",
         "created_at": "2021-04-01T08:13:03.643412Z",
         "updated_at": "2021-04-01T08:13:03.643479Z"
       }
      ]
  */
  },
  floor_plans: {},
  floor_plan: {},
  issues: {},
  files: {}
};

const getters = {
  getFloorPlansByProject: (state) => (project_id) => {
    return Object.values(state.projects).filter(project => project.id === project_id)

  },
  getIssuesFromFloorPlans: (state) => (floor_plan_id) => {
    return Object.values(state.floor_plans).filter(floor_plan => floor_plan.id === floor_plan_id)
  }
};

const mutations = {
  setProjects: function (state, payload) {
    state.projects = payload
  },
  setFloorPlans: function (state, payload) {
    state.floor_plans = payload
  }
};

const actions = {
  createProject: async function ({commit}, payload) {
    await ApiClient.post("/projects", payload).then(res => {
        console.log("res", res.status === 200)
      }
    )
  },
  getProjects: async function ({commit}) {
    await ApiClient.get("/projects").then(res => {
      const {data} = res
      commit('setProjects', data)
    }).catch(err => console.log(err))
  },
  getProject: async function ({commit}, payload) {
    await ApiClient.get("/projects/" + payload.project_id).then(res => console.log(res))
  },
  renameProject: async function ({commit}, payload) {
    await ApiClient.put('/projects/' + payload.project_id, payload.updates).then(res => console.log(res))
  },
  getFloorPlansByProjectId: async function ({commit}, payload) {
    await ApiClient.get(`/projects/${payload.project_id}/floor_plans`).then(res => {
      const {data} = res
      commit('setFloorPlans', data)
    })
  },
  uploadFloorPlansByProjectId: async function ({commit}, payload) {
    await ApiClient.post(`/projects/${payload.project_id}/floor_plans`, payload.form).then(res => console.log(res))
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
