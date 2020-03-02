import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'dashboard' },
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'dashboard' }
      }
    ]
  },

  {
    path: '/system/role',
    component: Layout,
    redirect: '/system/role/list',
    name: '角色管理',
    meta: { title: 'role', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '角色列表',
        component: () => import('@/views/system/role/list'),
        meta: { title: 'roleList' }
      },
      {
        path: 'add',
        name: '角色新增',
        component: () => import('@/views/system/role/add'),
        meta: { title: 'roleAdd' }
      },
      {
        path: 'edit/:id',
        name: '角色编辑',
        component: () => import('@/views/system/role/edit'),
        meta: { title: 'roleEdit' }
      }
    ]
  },

  {
    path: '/system/user',
    component: Layout,
    redirect: '/system/user/list',
    name: '用户管理',
    meta: { title: 'user', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/system/user/list'),
        meta: { title: 'userList' }
      },
      {
        path: 'add',
        name: '用户新增',
        component: () => import('@/views/system/user/add'),
        meta: { title: 'userAdd' }
      },
      {
        path: 'edit/:id',
        name: '用户编辑',
        component: () => import('@/views/system/user/edit'),
        meta: { title: 'userEdit' }
      }
    ]
  },
  {
    path: '/system/menu',
    component: Layout,
    redirect: '/system/menu/main',
    name: '菜单管理',
    meta: { title: 'menu', icon: 'example' },
    children: [
      {
        path: 'main',
        name: 'menuList',
        component: () => import('@/views/system/menu/menu'),
        meta: { title: 'menu', icon: 'tree' }
      }
    ]
  },
  {
    path: '/system/job',
    component: Layout,
    redirect: '/system/job/list',
    name: '任务管理',
    meta: { title: 'schedule', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '任务列表',
        component: () => import('@/views/system/job/list'),
        meta: { title: 'scheduleList' }
      },
      {
        path: 'add',
        name: '任务新增',
        component: () => import('@/views/system/job/add'),
        meta: { title: 'scheduleAdd' }
      },
      {
        path: 'edit/:id',
        name: '编辑任务',
        component: () => import('@/views/system/job/edit'),
        meta: { title: 'scheduleEdit' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  base: process.env.VUE_APP_BASE_URL,
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
