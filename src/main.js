// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './vuex';

Vue.config.productionTip = false;
Vue.use(iView);

const v = new Vue();
axios.defaults.withCredentials = true;
// 写一个axios拦截器。针对接口返回的4xx与5xx返回做统一的错误处理，重定向值error页面。并取消该次请求下的操作
const axiosHttpRequest = {}; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;
// const WhiteList = [];
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 忽略的请求
  // let ignore = false;
  // WhiteList.every((v) => {
  //   if (config.url.match(v)) {
  //     ignore = true;
  //     return false;
  //   }
  //   return true;
  // });
  // if (ignore) return config;

  config.cancelToken = new CancelToken((c) => {
    let url = config.url;
    const keys = Object.keys(config.params || {});
    if (keys.length) {
      url += '?';
      keys.forEach((k) => {
        url += `${k}=${config.params[k]}&`;
      });
      url = url.slice(0, -1);
    }
    axiosHttpRequest[url] = c;
  });
  return config;
}, error => Promise.reject(error));

// 添加响应拦截器
axios.interceptors.response.use((res) => {
  let url = res.config.url;
  // let ignore = false;
  // WhiteList.every((v) => {
  //   if (url.match(v)) {
  //     ignore = true;
  //     return false;
  //   }
  //   return true;
  // });
  // if (ignore) return res;

  const keys = Object.keys(res.config.params || {});
  if (keys.length) {
    url += '?';
    keys.forEach((k) => {
      url += `${k}=${res.config.params[k]}&`;
    });
    // $.each(res.config.params, (k, v) => { url += `${k}=${v}&`; });
    url = url.slice(0, -1);
  }

  // let data = '';
  // if (typeof res.data.data === 'string') {
  //   data = data.slice(0, 100);
  // }
  if (String(res.data.code).match(/^4.*$/)) { // 权限不足
    v.$Notice.warn({
      title: '没有权限',
    });
    axiosHttpRequest[url]();
  } else if (String(res.data.code).match(/^5.*$/)) { // 服务器出错
    v.$Notice.error({
      title: '服务器出错，请联系开发人员',
    });
    axiosHttpRequest[url]();
  }
  delete axiosHttpRequest[url];
  return res;
}, () => ({
  data: {}, // 返回一个空对象，主要是防止控制台报错);
}));

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
}).$mount('#app');
