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
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/register', component: Register },  
    { path: '/edit/:id', component: Edit, beforeEnter: requireAuth  }, 
];

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;
