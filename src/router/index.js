import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/report',
    component: Layout,
    meta: {
      title: 'Report',
      icon: 'clipboard',
      roles: ['admin', 'channel'],
      noCache: true
    }, // you can set roles in root nav
    children: [{
      path: 'insert',
      component: _import('newReport/newReport'),
      name: 'newReport',
      meta: {
        title: 'New',
        icon: 'form',
        roles: ['admin', 'channel'], // or you can only set roles in sub nav
        noCache: true
      }
    }, {
      path: 'list',
      component: _import('reportList/reportList'),
      name: 'reportList',
      meta: {
        title: 'History',
        icon: 'table',
        roles: ['admin', 'channel'], // or you can only set roles in sub nav
        noCache: true
      }
    }, {
      path: ':id',
      component: _import('report/report'),
      hidden: true,
      meta: {
        title: 'Report',
        icon: 'lock',
        roles: ['admin', 'channel'], // or you can only set roles in sub nav
        noCache: true
      }
    }]
  }, {
    path: '/admin',
    component: Layout,
    meta: {
      title: 'Admin',
      icon: 'lock',
      roles: ['admin'],
      noCache: true
    },
    children: [{
      path: 'user',
      component: _import('user/userList'),
      name: 'User',
      meta: {
        title: 'User',
        icon: 'peoples',
        roles: ['admin'], // or you can only set roles in sub nav
        noCache: true
      }
    }, {
      path: 'log',
      component: _import('user/log'),
      name: 'Log',
      meta: {
        title: 'Log',
        icon: 'bug',
        roles: ['admin'], // or you can only set roles in sub nav
        noCache: true
      }
    }, {
      path: 'report/:userId',
      component: _import('user/userReportList'),
      hidden: true,
      meta: {
        roles: ['admin'], // or you can only set roles in sub nav
        noCache: true
      }
    }
    ]
  },
  { path: '*', redirect: '/report/insert', hidden: true }
]
