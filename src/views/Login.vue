<script setup>
   import { ref } from 'vue';
   // import { useRouter } from 'vue-router';
   import { useUserStore } from '../store/userStore'

   const email = ref ('')
   const password =  ref('')
   const userStore = useUserStore()
   // const router = useRouter()

   const handleSubmit = async () => {
      if (!email.value || password.value.length < 5) {
        alert("ingresa los campos");
      }
      await userStore.loginUser(email.value, password.value)
      // router.push('/')

   }

</script>

<template>
   <h1>Login</h1>

   <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Ingrese email" v-model.trim="email">
      <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
      <button type="submit" :disabled="userStore.loadingUser">Ingresar</button>
   </form>
</template>
