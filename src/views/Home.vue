<script setup>
   import { useUserStore } from '../store/userStore'

   const userStore = useUserStore()
</script>

<template>
   <h1>Home</h1>
   <p>{{ userStore.userData?.email }}</p>
</template>

