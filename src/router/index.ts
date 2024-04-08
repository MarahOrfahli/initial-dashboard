import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },
    // {
    //     path: '/analytics',
    //     name: 'analytics',
    //     component: () => import(/* webpackChunkName: "analytics" */ '../views/analytics.vue'),
    // },
    // {
    //     path: '/finance',
    //     name: 'finance',
    //     component: () => import(/* webpackChunkName: "finance" */ '../views/finance.vue'),
    // },
    // {
    //     path: '/apps/chat',
    //     name: 'chat',
    //     component: () => import(/* webpackChunkName: "apps-chat" */ '../views/apps/chat.vue'),
    // },
    {
        path: '/apps/workcharts',
        name: 'workcharts',
        component: () => import(/* webpackChunkName: "apps-todolist" */ '../views/apps/workcharts.vue'),
    },
    {
        path: '/apps/todolist',
        name: 'todolist',
        component: () => import(/* webpackChunkName: "apps-todolist" */ '../views/apps/todolist.vue'),
    },
    ////////////////////////////////
    /* Main Categories */
    {
        path: '/apps/categories/main-categories/list',
        name: 'main-categories-list',
        component: () => import(/* webpackChunkName: "apps-invoice-list" */ '../views/apps/categories/main-categories/list.vue'),
    },
    // {
    //     path: '/apps/invoice/preview',
    //     name: 'invoice-preview',
    //     component: () => import(/* webpackChunkName: "apps-invoice-preview" */ '../views/apps/invoice/preview.vue'),
    // },
    {
        path: '/apps/categories/main-categories/add',
        name: 'main-categories-add',
        component: () => import(/* webpackChunkName: "apps-invoice-add" */ '../views/apps/categories/main-categories/add.vue'),
    },
    {
        path: '/apps/categories/main-categories/edit',
        name: 'main-categories-edit',
        component: () => import(/* webpackChunkName: "apps-invoice-edit" */ '../views/apps/categories/main-categories/edit.vue'),
    },


    ////////////////////////
    // invoice
    {
        path: '/apps/invoice/list',
        name: 'invoice-list',
        component: () => import(/* webpackChunkName: "apps-invoice-list" */ '../views/apps/invoice/list.vue'),
    },
    {
        path: '/apps/invoice/preview',
        name: 'invoice-preview',
        component: () => import(/* webpackChunkName: "apps-invoice-preview" */ '../views/apps/invoice/preview.vue'),
    },
    {
        path: '/apps/invoice/add',
        name: 'invoice-add',
        component: () => import(/* webpackChunkName: "apps-invoice-add" */ '../views/apps/invoice/add.vue'),
    },
    {
        path: '/apps/invoice/edit',
        name: 'invoice-edit',
        component: () => import(/* webpackChunkName: "apps-invoice-edit" */ '../views/apps/invoice/edit.vue'),
    },
    {
        path: '/apps/calendar',
        name: 'calendar',
        component: () => import(/* webpackChunkName: "apps-calendar" */ '../views/apps/calendar.vue'),
    },
    //charts
    {
        path: '/charts',
        name: 'charts',
        component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
    },
    // users
    {
        path: '/users/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "users-profile" */ '../views/users/profile.vue'),
    },
    {
        path: '/users/user-account-settings',
        name: 'user-account-settings',
        component: () => import(/* webpackChunkName: "users-user-account-settings" */ '../views/users/user-account-settings.vue'),
    },

    // pages
    {
        path: '/pages/faq',
        name: 'faq',
        component: () => import(/* webpackChunkName: "pages-faq" */ '../views/pages/faq.vue'),
    },
    {
        path: '/pages/coming-soon-boxed',
        name: 'coming-soon-boxed',
        component: () => import(/* webpackChunkName: "pages-coming-soon-boxed" */ '../views/pages/coming-soon-boxed.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/coming-soon-cover',
        name: 'coming-soon-cover',
        component: () => import(/* webpackChunkName: "pages-coming-soon-cover" */ '../views/pages/coming-soon-cover.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error404',
        name: 'error404',
        component: () => import(/* webpackChunkName: "pages-error404" */ '../views/pages/error404.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error500',
        name: 'error500',
        component: () => import(/* webpackChunkName: "pages-error500" */ '../views/pages/error500.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error503',
        name: 'error503',
        component: () => import(/* webpackChunkName: "pages-error503" */ '../views/pages/error503.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/maintenence',
        name: 'maintenence',
        component: () => import(/* webpackChunkName: "pages-maintenence" */ '../views/pages/maintenence.vue'),
        meta: { layout: 'auth' },
    },

    // authentication
    {
        path: '/auth/boxed-signin',
        name: 'boxed-signin',
        component: () => import(/* webpackChunkName: "auth-boxed-signin" */ '../views/auth/boxed-signin.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/boxed-signup',
        name: 'boxed-signup',
        component: () => import(/* webpackChunkName: "auth-boxed-signup" */ '../views/auth/boxed-signup.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/boxed-lockscreen',
        name: 'boxed-lockscreen',
        component: () => import(/* webpackChunkName: "auth-boxed-lockscreen" */ '../views/auth/boxed-lockscreen.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/boxed-password-reset',
        name: 'boxed-password-reset',
        component: () => import(/* webpackChunkName: "auth-boxed-password-reset" */ '../views/auth/boxed-password-reset.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-login',
        name: 'cover-login',
        component: () => import(/* webpackChunkName: "auth-cover-login" */ '../views/auth/cover-login.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-register',
        name: 'cover-register',
        component: () => import(/* webpackChunkName: "auth-cover-register" */ '../views/auth/cover-register.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-lockscreen',
        name: 'cover-lockscreen',
        component: () => import(/* webpackChunkName: "auth-cover-lockscreen" */ '../views/auth/cover-lockscreen.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-password-reset',
        name: 'cover-password-reset',
        component: () => import(/* webpackChunkName: "auth-cover-password-reset" */ '../views/auth/cover-password-reset.vue'),
        meta: { layout: 'auth' },
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
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
