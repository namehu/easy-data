/**
 * vuex js
 * @description vue状态管理js
 * Created by xiang.hu on 2017/7/2.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  modules: {
    app,
  },

});
