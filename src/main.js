// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from './http/axios.js';
import utils from  './common/utils.js';
import filters from  './common/filter.js';
import directive from './common/directive';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
import '../static/css/main.css';
import store from './store/index.js'
import htmlToPdf from '@/common/htmlToPdf'
import AMap from 'vue-amap';
import router from './router'
import App from './App'
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'XXXXXXXXXXXXXXXXXX',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
Vue.use(htmlToPdf)
Vue.use(ElementUI);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false
Vue.prototype.$http=Axios;
Vue.prototype.$utils=utils;
for(let key in filters){
  Vue.filter(key,filters[key])/*注册全局过滤器，一定要在new Vue之前注册*/

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  router
})


