import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [{path: '', component: () => import('pages/IndexPage.vue')},
            {path: 'friend', component: () => import('pages/Friend.vue')},
            {path: 'resource', component: () => import('pages/Resource.vue')},
            {path: 'upload', component: () => import('pages/Upload.vue')},
            {path: 'blog', component: () => import('pages/Bolg.vue')},

        ],
    },

    {
        path: '/login',
        component: () => import('layouts/Login.vue')
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
