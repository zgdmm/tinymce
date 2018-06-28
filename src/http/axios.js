import axios from 'axios'
import {
  Message
} from 'element-ui';
import Vue from 'vue'
import router from '../router'


let http = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = [];
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
      }
    }
    return newData.join("&");
  }]
});

function apiAxios(method, url, params, response) {
  console.log(process.env.NODE_ENV === 'production')
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    console.log(res);
    let data = res.data;
    if (data.code) {
      //请求成功
      response(data);
      console.log(data,'data');
      if (data.code == 'user_not_login_background') {
        Message.warning(data.message);
        // Router.push({path:'/login'});
        setTimeout(_ => {
          router.replace({
            path: '/login' //自己修改
          })
        }, 100)
        return;
      }
    }else{
      
    }
    //  response(res);
  }).catch(function (err) {
    // console.log(err)
    // if (err.response&&err.response.status == 500) {
    //   Message.warning('系统异常');
    //   response(err);
    //   //console.log(err)
    // }
  })
}
function h5Axios(method, url, params, response) {
  http({
    method: method,
    url: process.env.NODE_ENV != 'production' ? ('h5'+url) : url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    console.log(res);
    let data = res;
    if (res.status == 200) {
      if (data.code == 1001) {
        Message.warning(data.message);
        // Router.push({path:'/login'});
        setTimeout(_ => {
          router.replace({
            path: '/' //自己修改
          })
        }, 100)
        return;
      }
      //请求成功
      response(data);
    }
    //  response(res);
  }).catch(function (err) {
    console.log(err)
    if (err.response&&err.response.status == 500) {
      Message.warning('系统异常');
      response(err);
      //console.log(err)
    }
  })
}
// axios.defaults.baseURL = 'http://192.168.95.74:9003/api/';
// //请求拦截处理
// axios.interceptors.response.use(
//   response => {
//     if (response.status * 1 == 200) {
//       let res = response.data;
//       if (res.status * 1 === 100) {//session失效情况 自己修改
//         Message.info('请登录');
//         setTimeout(_ =>{
//           router.replace({
//             path: '/login'//自己修改
//           })
//         },1000)
//       } else if(res.status * 1 == 510 || res.status * 1 == 520){
//         //项目过期情况  自行修改
//         Message.info(res.msg);
//         setTimeout(_ =>{
//           router.replace({
//             path: '/creatProject'
//           })
//         },1000)
//       } else {
//         //正常返回
//         return response;
//       }
//     } else {
//     }
//   }
// );
export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  },
  posth5: function (url, params, response) {
    return h5Axios('POST', url, params, response)
  },
}
