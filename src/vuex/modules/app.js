export default {
  state: {
    project: [],
  },
  mutations: {
    UPDATE_PROJECT(state, payload) {
      state.project = payload;
    },
    PUSH_PROJECT(state, payload) {
      state.project.push(payload);
    },
  },
};
