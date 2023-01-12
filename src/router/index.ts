import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
    {
        path: "/404",
        component: () => import("../views/404.vue"),
    },
    {
        path: "/",
        component: () => import("../views/CxkContainer.vue"),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import("../views/Home.vue")
            },

        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router