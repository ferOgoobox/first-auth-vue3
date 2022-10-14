<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { useDatabaseStore } from '../store/database'
    

    const route = useRoute()
    const databaseStore = useDatabaseStore()
    const url = ref('')
    // console.log(route.params)

    const handleSubmit = () => {
        databaseStore.updateUrl(route.params.id, url.value)
    }

    onMounted(async () => {
        url.value = await databaseStore.readUrl(route.params.id)
    })
</script>

<template >
    <h1>Editar</h1>
    <p v-if="databaseStore.loadingDoc">Loading doc...</p>
    <form @submit.prevent="handleSubmit" v-else>
      <input type="text" placeholder="Ingrese URL" v-model="url">
      <button type="submit" :disabled="databaseStore.loadingDoc">Guardar cambios</button>
   </form>
</template>

