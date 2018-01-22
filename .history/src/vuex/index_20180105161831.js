/**
 * vuex js
 * @description vue状态管理js
 * Created by xiang.hu on 2017/7/2.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import config from './modules/config';
import login from './modules/login';
import menu from './modules/menu';
import home from './modules/home';
import loading from './modules/loading';
import tableau from './modules/tableau';
import helpManual from './modules/helpManual';
import article from './modules/article';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    direction: 'forward',
  },
  mutations: {
    updateDirection(state, obj) {
      state.direction = obj.direction;
    },
  },
  modules: {
    config, login, menu, home, loading, tableau, helpManual, article,
  },

});
