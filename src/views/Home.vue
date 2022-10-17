<script setup>
   import { useUserStore } from '../store/userStore'
   import { useDatabaseStore } from '../store/database'
   import { onBeforeMount  } from 'vue';
   import { useRouter } from 'vue-router'
   import { message } from  'ant-design-vue'
   
   const router = useRouter()
   const userStore = useUserStore()
   const databaseStore = useDatabaseStore()

   onBeforeMount(async () => {
    await databaseStore.getUrls();
   });

   const confirm = async (id) => {

      const error = await databaseStore.deleteUrl(id)
      if(!error)return message.success('Se ha eliminado');
      return message.error(error);

    };

    const cancel = (e) => {
      message.error('No se eliminó');
    };

</script>

<template>
   <h1 class="text-center">Home</h1>
   <p class="text-center">{{ userStore.userData?.email }}</p>
   <add-form></add-form>

   <p v-if="databaseStore.loadig">Loading doc...</p>

   <a-space direction="vertical" v-if="!databaseStore.loadig" style="width: 100%">
      <a-card 
         v-for="item in databaseStore.documents" 
         :key="item.id"
         :title="item.short" 
         style="width: 100%"
      >
         <template #extra>
            <a-space>
               <a-popconfirm
                  title="Estas seguro que deseas eliminarlo?"
                  ok-text="Si"
                  cancel-text="No"
                  @confirm="confirm(item.id)"
                  @cancel="cancel"
                  :disabled="userStore.loadingUser"
                  :loading = "userStore.loadingUser"
               >
                  <a-button danger>Eliminar</a-button>
               </a-popconfirm>
               <a-button type="primary"      @click="router.push(`/edit/${item.id}`)">Editar</a-button>
            </a-space>
         </template>
         <p>{{ item.name }}</p>
      </a-card>
   </a-space>
</template>

