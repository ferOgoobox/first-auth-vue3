<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { useDatabaseStore } from '../store/database'
    import { message } from 'ant-design-vue'
    

    const route = useRoute()
    const router = useRouter()
    const databaseStore = useDatabaseStore()

    const formState = reactive ({
        url: ""
    })

    const onFinish = async () => {
        const error = await databaseStore.updateUrl(route.params.id, formState.url)
        if(!error){
            formState.url = ''
            return message.success('Se ha editado la URL correctamente')
        }
        switch(error){
            //buscar errores
            default:
                message.error('Falla del servior, vuelve a intentarlo')
                break
        }
    }

    onMounted(async () => {
        formState.url = await databaseStore.readUrl(route.params.id)
    })
</script>

<template >
   <h1>Editar id: {{ route.params.id }}</h1>
    
    <p v-if="databaseStore.loadingDoc">Loading doc...</p>

   <a-form
        name="editForm"
        autocomplete="off"
        :model="formState"
        @finish="onFinish"

    >
        <a-form-item
            name="url"
            label="Ingrese URL"
            :rules = "[{ 
                required: true, 
                whitespace: true, 
                message: 'Ingrese una URL válida',
                pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            }]"
        >
            <a-input  v-model:value="formState.url"/>
        </a-form-item>

        <a-form-item>
            <a-space>
                <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="databaseStore.loadingDoc"
                    :loading="databaseStore.loadingDoc"
                >Guardar cambios
                </a-button>
                <a-button 
                    @click="router.push('/')"
                >Regresar
                </a-button>
            </a-space>
        </a-form-item>
    </a-form>
</template>

