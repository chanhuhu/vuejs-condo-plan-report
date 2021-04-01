import {ApiClient} from "../plugins/axios";


const state = {
  project: {},
  projects: {},
};

const getters = {};

const mutations = {};

const actions = {
  createProject: async function ({commit}, payload) {
    await ApiClient.post("/projects", payload).then(res => {
        console.log("res", res.status === 200)
      }
    )
  },
  getProjects: async function ({commit}) {
    await ApiClient.get("/projects").then(res => console.log(res.data))
  },
  getProject: async function ({commit}, payload) {
    await ApiClient.get("/projects/" + payload.project_id).then(res => console.log(res))
  },
  renameProject: async function ({commit}, payload) {
    await ApiClient.put('/projects/' + payload.project_id, payload.updates).then(res => console.log(res))
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
