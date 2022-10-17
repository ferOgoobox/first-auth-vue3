<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from './store/userStore';
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const selectedKeys = ref(["login"])

watch(
  () => route.name, 
  () => {
    selectedKeys.value = [route.name]
  }
)


</script>

<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
      <a-menu-item v-if="userStore.userData" key="home">
          <router-link  to="/">Home</router-link> 
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
         <router-link  to="/login">Login</router-link> 
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link  to="/register">Register</router-link> 
        </a-menu-item>
        <a-menu-item  v-if="userStore.userData" key="logout"
            @click="userStore.signOutUser">
          Logout
        </a-menu-item>
      </a-menu>
      <nav></nav>
    </a-layout-header> 
    <a-layout-content  style="padding: 0 50px">
      <div class="container">
      <div v-if="userStore.loadingSession"> Loading user...</div>
      <router-view></router-view>
    </div>
    </a-layout-content>
    <nav >
      
      
    </nav> 
  </a-layout>
</template>


<style >
  .container  {
    background: #fff;
    padding: 24px;
    min-height: calc(100vh - 64px); 
  }
  .text-center {
    text-align: center
  }
</style>
