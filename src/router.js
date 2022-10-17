import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Edit from './views/Edit.vue'
import { useUserStore } from './store/userStore'


const requireAuth  =  async(to, from, next) => {
    const userStore = useUserStore()
    userStore.loadingSession = true
    const user = await userStore.currentUse()
    if(user){
        next()
    }else{
        next('/login')
    }
    userStore.loadingSession = false
}

const routes = [
    { path: "/", component: Home, beforeEnter: requireAuth, name: "home" },
    { path: '/login', component: Login, name: "login" },
    { path: '/register', component: Register, name: "register" },  
    { path: '/edit/:id', component: Edit, beforeEnter: requireAuth, name: "edit" }, 
];

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;
