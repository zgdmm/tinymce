import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * 登陆
 * @param resolve
 */
const login = resolve => require.ensure([], () => resolve(require('../views/login/login')), 'login')

/**
 * 导航
 * @param resolve
 */
const navMenu = resolve => require.ensure([], () => resolve(require('../views/nav/navMenu')), 'navMenu')
/**
 * 产品管理
 * @param resolve
 */
const notice = resolve => require.ensure([], () => resolve(require('../views/notice/notice')), 'notice')
const activity = resolve => require.ensure([], () => resolve(require('../views/activity/activity')), 'activity')
const news= resolve => require.ensure([], () => resolve(require('../views/news/news')), 'news')
const noticeNew= resolve => require.ensure([], () => resolve(require('../views/notice/noticeNew')), 'noticeNew')
const noticeDetail= resolve => require.ensure([], () => resolve(require('../views/notice/noticeDetail')), 'noticeDetail')
const newsNew= resolve => require.ensure([], () => resolve(require('../views/news/newsNew')), 'newsNew')
const newsDetail= resolve => require.ensure([], () => resolve(require('../views/news/newsDetail')), 'newsDetail')
const activityNew= resolve => require.ensure([], () => resolve(require('../views/activity/activityNew')), 'activityNew')
const activityDetail= resolve => require.ensure([], () => resolve(require('../views/activity/activityDetail')), 'activityDetail')
// const newsNew= resolve => require.ensure([], () => resolve(require('../views/news/newsNew')), 'newsNew')
// const news= resolve => require.ensure([], () => resolve(require('../views/news/news')), 'news')
const policyNew= resolve => require.ensure([], () => resolve(require('../views/policy/policyNew')), 'policyNew')
const policy= resolve => require.ensure([], () => resolve(require('../views/policy/policy')), 'policy')
const parkmerchantNew= resolve => require.ensure([], () => resolve(require('../views/parkmerchant/parkmerchantNew')), 'parkmerchantNew')
const parkmerchant= resolve => require.ensure([], () => resolve(require('../views/parkmerchant/parkmerchant')), 'parkmerchant')
const policyDetail= resolve => require.ensure([], () => resolve(require('../views/policy/policyDetail')), 'policyDetail')
const parkmerchantDetail= resolve => require.ensure([], () => resolve(require('../views/parkmerchant/parkmerchantDetail')), 'parkmerchantDetail')
/**
 * 基础信息
 * @param resolve
 */
// h5
export default new Router({
  routes: [
    { path: '/', redirect: '/login' },//登陆界面
    {path: '/login', name: 'login', component: login},
    {
      path: '',
      name: 'navMenu',
      component: navMenu,
      children: [
        {path: '/activity', name: 'activity', component: activity},
        {path: '/activityDetail', name: 'activityDetail', component: activityDetail},
        {path: '/news', name: 'news', component: news},
        {path: '/newsDetail', name: 'newsDetail', component: newsDetail},
        {path: '/newsNew', name: 'newsNew', component: newsNew},
        {path: '/notice', name: 'notice', component: notice},
        {path: '/noticeNew', name: 'noticeNew', component: noticeNew},
        {path: '/policy', name: 'policy', component: policy},
        {path: '/policyNew', name: 'policyNew', component: policyNew},
        {path: '/policyDetail', name: 'policyDetail', component: policyDetail},
        {path: '/parkmerchantDetail', name: 'parkmerchantDetail', component: parkmerchantDetail},
        {path: '/parkmerchants', name: 'parkmerchant', component: parkmerchant},
        {path: '/parkmerchantNew', name: 'parkmerchantNew', component: parkmerchantNew},
        {name: 'activityNew', path: '/activityNew', component: activityNew},
        {name: 'policyDetail', path: '/policyDetail', component: policyDetail},
        {name: 'noticeDetail', path: '/noticeDetail', component: noticeDetail},        
        
      ]
    },

  ],
})
