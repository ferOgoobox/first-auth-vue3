<script setup>
   import { useUserStore } from '../store/userStore'
   import { useDatabaseStore } from '../store/database'
   import { ref, onBeforeMount  } from 'vue';
   import { useRouter } from 'vue-router'
   
   const url = ref('')
   
   const router = useRouter()
   const userStore = useUserStore()
   const databaseStore = useDatabaseStore()

   const handleSubmit = () => {
      databaseStore.addUrl(url.value)
   }
   onBeforeMount(async () => {
    await databaseStore.getUrls();
   });

</script>

<template>
   <h1>Home</h1>
   <p>{{ userStore.userData?.email }}</p>
   <form @submit.prevent="handleSubmit()">  
      <input type="text" placeholder="Ingrese URL" v-model="url">
      <button type="submit" :disabled="databaseStore.loadingDoc">Agregar</button>
   </form>

   <ul v-if="!databaseStore.loadig">
      <li 
         v-for="item in databaseStore.documents" :key="item.id">
         <p>ID: {{ item.id}} - NAME: {{ item.name}} </p> 
         <p>SHORT:{{ item.short }}</p>
         <button 
            @click="databaseStore.deleteUrl(item.id)" 
            :disabled="databaseStore.loadingDoc"
            >Eliminar
         </button>
         <button @click="router.push(`/edit/${item.id}`)">Editar</button>
         <hr>
      </li>
   </ul>
   <p v-else>Loading Docs...</p>
   
</template>

