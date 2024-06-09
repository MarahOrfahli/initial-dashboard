import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/apps/workcharts.vue';
const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: HomeView },
    {
        path: '/:catchAll(.*)',
        meta: { requiresAuth: true },
        redirect: { name: 'error404' },
    },
    // {
    //     path: '/analytics',
    //     name: 'analytics',
    //     component: () => import('../views/analytics.vue'),
    // },
    // {
    //     path: '/finance',
    //     name: 'finance',
    //     component: () => import('../views/finance.vue'),
    // },
    // {
    //     path: '/apps/chat',
    //     name: 'chat',
    //     component: () => import('../views/apps/chat.vue'),
    // },
    {
        path: '/apps/workcharts',
        name: 'workcharts',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/workcharts.vue'),
    },
    {
        path: '/apps/todolist',
        name: 'todolist',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/todolist.vue'),
    },
    ////////////////////////////////
    /* Brand */
    {
        path: '/pages/brand/list',
        name: 'brand-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/brand/list.vue'),
    },
    ////////////////////////////////
    /* Store */
    {
        path: '/pages/store/list',
        name: 'store-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/store/list.vue'),
    },
    {
        path: '/pages/store/details',
        name: 'store-details',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/store/details.vue'),
    },
    {
        path: '/pages/store/track',
        name: 'store-track',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/store/storeTrack.vue'),
    },
    ////////////////////////////////
    /* Regions */
    {
        path: '/pages/region/list',
        name: 'region-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/regions/list.vue'),
    },
    ////////////////////////////////
    /* Main Categories */
    {
        path: '/pages/categories/mainCategories/list',
        name: 'mainCategories-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/categories/mainCategories/list.vue'),
    },
    ////////////////////////////////
    /* Sub Categories */
    {
        path: '/pages/categories/subCategories/list',
        name: 'subCategories-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/categories/subCategories/list.vue'),
    },
    ////////////////////////////////
    /* Products */
    {
        path: '/pages/products/list',
        name: 'products-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/products/list.vue'),
    },
    {
        path: '/pages/products/add-edit/:type',
        name: 'products-add',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/products/add-edit.vue'),
        props: true,
    },
    {
        path: '/pages/products/add-edit/:type/:id',
        name: 'products-edit',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/products/add-edit.vue'),
        props: true,
    },
    {
        path: '/pages/products/ManageImages/:id',
        name: 'products-manageImages',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/products/manageProductImages.vue'),
        props: true,
    },
    ////////////////////////////////////////////
    /* Customers */
    {
        path: '/pages/customers/list',
        name: 'customers-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/Customers/list.vue'),
    },
    {
        path: '/pages/customers/add-edit/:type',
        name: 'customers-add',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/Customers/add-edit.vue'),
        props: true,
    },
    {
        path: '/pages/customers/add-edit/:type/:id',
        name: 'customers-edit',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/Customers/add-edit.vue'),
        props: true,
    },
    ////////////////////////////////////////////
    /* Orders */
    {
        path: '/pages/orders/list',
        name: 'orders-list',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/orders/list.vue'),
    },
    {
        path: '/pages/orders/add-edit/:type',
        name: 'orders-add',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/orders/add-edit.vue'),
        props: true,
    },
    {
        path: '/pages/orders/add-edit/:type/:id',
        name: 'orders-edit',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/orders/add-edit.vue'),
        props: true,
    },
    {
        path: '/pages/orders/details/:id',
        name: 'orders-details',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/orders/details.vue'),
        props: true,
    },
    ////////////////////////////////////////////
    /* Apps */
    {
        path: '/apps/calendar',
        name: 'calendar',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/calendar.vue'),
    },
    //charts
    {
        path: '/charts',
        name: 'charts',
        meta: { requiresAuth: true },
        component: () => import('../views/charts.vue'),
    },
    // users
    {
        path: '/users/profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import('../views/users/profile.vue'),
    },
    {
        path: '/users/user-account-settings',
        name: 'user-account-settings',
        meta: { requiresAuth: true },
        component: () => import('../views/users/user-account-settings.vue'),
    },

    // pages
    {
        path: '/pages/faq',
        name: 'faq',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/faq.vue'),
    },
    {
        path: '/pages/coming-soon-boxed',
        name: 'coming-soon-boxed',
        component: () => import('../views/pages/coming-soon-boxed.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/coming-soon-cover',
        name: 'coming-soon-cover',
        component: () => import('../views/pages/coming-soon-cover.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/error404',
        name: 'error404',
        component: () => import('../views/pages/error404.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/error500',
        name: 'error500',
        component: () => import('../views/pages/error500.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/error503',
        name: 'error503',
        component: () => import('../views/pages/error503.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/maintenence',
        name: 'maintenence',
        component: () => import('../views/pages/maintenence.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },

    // authentication
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/boxed-signin.vue'),
        meta: { layout: 'auth', requiresAuth: false  },
    },
    {
        path: '/auth/boxed-signup',
        name: 'boxed-signup',
        component: () => import('../views/auth/boxed-signup.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/boxed-lockscreen',
        name: 'boxed-lockscreen',
        component: () => import('../views/auth/boxed-lockscreen.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/auth/boxed-password-reset',
        name: 'boxed-password-reset',
        component: () => import('../views/auth/boxed-password-reset.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/auth/cover-login',
        name: 'cover-login',
        component: () => import('../views/auth/cover-login.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/cover-register',
        name: 'cover-register',
        component: () => import('../views/auth/cover-register.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/auth/cover-lockscreen',
        name: 'cover-lockscreen',
        component: () => import('../views/auth/cover-lockscreen.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/auth/cover-password-reset',
        name: 'cover-password-reset',
        component: () => import('../views/auth/cover-password-reset.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    const isAuthenticated = !!localStorage.getItem('authToken')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
          if (to.path !== '/login') {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            });
          } else {
            next(); // Already on login page, so proceed
          }
        } else {
            if(from.query.redirect != null && to.path === '/'){
                next({ path: from.query.redirect.toString() });
            }else{
                if(to.path === '/login'){
                    next({ path: from.path });
                }
                else next(); // User is logged in, proceed to route
            }
        }
      } else {
        if(isAuthenticated){
            if (to.path === '/login') {
                next({ path: '/'});
            } else {
                next(); // No auth required, proceed to route
            }
        }else{
            if (to.path !== '/login') {
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                });
            }else next()
        }
        
        
      }
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
