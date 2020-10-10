import VueRouter from 'vue-router'
import Vue from 'vue'

// 安装插件
Vue.use(VueRouter)

const home = () =>
    import ('../views/home/Home.vue')
    // const category = () =>
    //     import ('../views/category/Category.vue')
const profile = () =>
    import ('../views/profile/Profile.vue')
const EditData = () =>
    import ('../views/profile/EditData.vue')

const Detail = () =>
    import ('../views/detail/Detail.vue')

const login = () =>
    import ('../views/login/Login.vue')

const register = () =>
    import ('../views/login/Register.vue')

const routes = [{
        path: '',
        redirect: '/home',
        meta: {
            keepalive: true
        }
    },
    {
        path: '/home',
        component: home
    },

    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },

    {
        path: '/profile',
        component: profile
    },
    {
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/editdata',
        component: EditData
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router