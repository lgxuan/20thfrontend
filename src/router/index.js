import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import('@/views/nav.vue'),
      children: [
        {
          path: "",
          name: "theIndex",
          component: () => import('@/components/Index.vue')
        },
        {
          path: "/square",
          name: "square",
          component: () => import('@/components/square/index.vue')
        },
        {
          path: "/info",
          name: "info",
          component: () => import('@/components/user/info.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/components/auth/login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/components/auth/register.vue')
        }
      ]
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/views/contentView.vue'),
      children:[
        {
          name: 'ArticleDetails',
          path: 'ArticleDetails/:id',
          props: true,
          component: () => import('@/components/articles/article.vue')
        },
        {
          name: 'WriteArticle',
          path: 'writeArticle/:id',
          props: true,
          component: () => import('@/components/articles/WriteArticle.vue')
        },
        {
          name: 'ArticleList',
          path: 'ArticleList/:apiPath/:theTitle?',
          props: true,
          component: () => import('@/components/articles/ArticleList.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ()=> import('@/views/contentView.vue'),
      children:[
        {
          path: 'index',
          name: 'adminIndex',
          component: () => import('@/components/user/admin/index.vue')
        },
        {
          path: 'setting/:type',
          name: 'manageBanners',
          props: true,
          component: () => import('@/components/user/admin/manageInformation.vue')
        },{
          path: 'manageUser',
          name: "manageUser",
          component: () => import('@/components/user/admin/manageUser.vue')
        }
      ]
    },
    {
      path: '/user/',
      name: 'user',
      component: ()=> import('@/views/contentView.vue'),
      children:[
        {
          path: 'about',
          name: 'about',
          component: () => import('@/components/user/about.vue')
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('@/components/user/setting.vue')
        }
      ]
    }
  ]
})

export default router
