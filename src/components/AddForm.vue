<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../store/database'
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore()

const formState = reactive ({ 
    url: ''
})

const onFinish = async (value) => {
    const error = await databaseStore.addUrl(formState.url)
    if(!error){
        formState.url = ''
        return message.success('Se ha agregado URL correctamente')
    }
    switch(error){
        //buscar errores
        default:
            message.error('Falla del servior, vuelve a intentarlo')
            break
    }
}

</script>

<template>
    <a-form
        name="addForm"
        autocomplete="off"
        :model="formState"
        @finish="onFinish"

    >
        <a-form-item
            name="url"
            label="Ingrese una URL"
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
            <a-button
                type="primary"
                html-type="submit"
                :disabled="databaseStore.loadingDoc"
                :loading="databaseStore.loadingDoc"
            >Agregar URL
            </a-button>
        </a-form-item>
    </a-form>
</template>