<script setup>
import { useUserStore } from './store/userStore'

const userStore = useUserStore()

</script>

<template>
  <h1>App base</h1>
  <nav v-if="!userStore.loadingSession">
    <router-link v-if="userStore.userData" to="/">Home</router-link> |
    <router-link v-if="!userStore.userData" to="/login">Login</router-link> |
    <router-link v-if="!userStore.userData" to="/register">Register</router-link> |
    <button      v-if="userStore.userData" @click="userStore.signOutUser">Logout</button>
  </nav> 
  <div v-else>
    Loading...
  </div>
  <router-view></router-view>
</template>


<style >
  
</style>
