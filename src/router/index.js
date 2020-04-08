import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
//import Layout from '../views/layout/Layout'

/* Router Modules */
/*import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'*/

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {path: '/login',component: () => import('@/views/login/index'),hidden: true},
  {path: '/404',component: () => import('@/views/error-page/404'),hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'home'}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  //栏目路由
  {
    path: '/category',
    component: Layout,
    children: [ 
      {
        path: 'list',
        component: () => import('@/pages/category/List'),
        name: 'category_list',
        meta: { title: '栏目管理', icon: 'product-cate',  affix: true }
      }
    ]
  },
  //电影路由
  {
    path: '/movie',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/movie/List'),
        name: 'movie_list',
        meta: { title: '电影列表', icon: 'product-list', affix: true }
      },
      {
        hidden:true,
        path: 'editor',
        component: () => import('@/pages/movie/Editor'),
        name: 'movie_editor',
        meta: { title: '电影编辑', icon: 'documentation', affix: true }
      },
      {
        hidden:true,
        path: 'look',
        component: () => import('@/pages/movie/Look'),
        name: 'movie_look',
        meta: { title: '电影查看', icon: 'documentation', affix: true }
      }
    ]
  },
  //用户路由
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/user/List'),
        name: 'user_list',
        meta: { title: '用户列表', icon: 'ums-admin', affix: true }
      },
      {
        hidden:true,
        path: 'editor',
        component: () => import('@/pages/user/Editor'),
        name: 'user_editor',
        meta: { title: '用户编辑', icon: 'documentation', affix: true }
      }
    ]
  },
  //角色路由
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/role/List'),
        name: 'role_list',
        meta: { title: '角色管理', icon: 'ums-role', affix: true }
      },
      {
        hidden:true,
        path: 'editor',
        component: () => import('@/pages/role/Editor'),
        name: 'role_editor',
        meta: { title: '角色编辑', icon: 'documentation', affix: true }
      }
    ]
  },

  //权限路由
  {
    path: '/privilege',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/privilege/List'),
        name: 'privilege_list',
        meta: { title: '权限管理', icon: 'ums', affix: true }
      },
      {
        hidden:true,
        path: 'editor',
        component: () => import('@/pages/privilege/Editor'),
        name: 'privilege_editor',
        meta: { title: '权限编辑', icon: 'documentation', affix: true }
      }
    ]
  },

  {
    path: '/log',
    component: Layout,
    redirect: '/log/editor',
    name: 'log',
    meta: {title: '日志管理', icon: 'log'},
    children: [{
      path: 'editor',
      name: 'editor',
      component: () => import('@/pages/log/editor/list'),
      meta: {title: '日志列表', icon: 'log-attr'}
    },
      {
        path: 'addlog',
        name: 'addlog',
        component: () => import('@/pages/log/editor/add'),
        meta: {title: '添加日志', icon: 'log-add'}
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
    {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
