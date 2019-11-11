import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: 'Home'
    },
    {
        path: '/',
        redirect: 'Home'
    },
    {
        path: '/home',
        name: 'Home',
        component: resolve => require(['@/pages/Home/Index'], resolve),
        meta: {
            title: '首页'
        }
    }
];

export default new Router({
    routes,
    scrollBehavior: function (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})