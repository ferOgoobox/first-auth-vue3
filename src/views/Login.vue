<script setup>
   import { reactive } from 'vue';
   import { useUserStore } from '../store/userStore';
   import { message } from 'ant-design-vue';

   const userStore = useUserStore()

   const formState = reactive ({
      email: 'f3r@gmail.com',
      password: '1234567890'
   })
   
   const onFinish = async (values) => {
      const respuesta = await userStore.loginUser(formState.email, formState.password)
      console.log('Success:', values);
      if(!respuesta){
         return message.success('Bienvenido')
      }
      switch(respuesta){
         case 'auth/wrong-password':
            message.error('Error de contraseña')
            break
         case 'auth/user-not-found':
            message.error('No existe cuenta')
            break
         default:
            message.error('Intentar nuevamente')
      }
    };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

</script>

<template>
   <h1 class="text-center">Login</h1>
   <a-row>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
         <a-form
            :model="formState"
            name="basicLogin"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
         >
            <a-form-item
               label="Email New"
               name="email"
               :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un email valido' }]"
            >
               <a-input v-model:value="formState.email" />
            </a-form-item>

            <a-form-item
               label="Contraseña:"
               name="password"
               :rules="[{ required: true, min: 6, whitespace: true, message: 'Ingresa tu contraseña con minimo 6 carácteres!' }]"
            >
               <a-input-password v-model:value="formState.password"/>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
               <a-button 
                  type="primary" 
                  html-type="submit" 
                  :disabled="userStore.loadingUser"
                  :loading="userStore.loadingUser"
                  >Ingresar
               </a-button>
            </a-form-item>

         </a-form>
      </a-col>
   </a-row>
</template>
