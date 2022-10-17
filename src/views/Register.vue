<script setup>
   import { reactive } from 'vue';
   import { useUserStore } from '../store/userStore'
   import { message } from 'ant-design-vue'

   const userStore = useUserStore()
   
   const formState = reactive ({
      email: 'fmv@gmail.com',
      password: '123456',
      repassword: '123456'
   })
   
   const onFinish = async (values) => {
      const respuesta = await userStore.registerUser(formState.email, formState.password)
      console.log('Success:', values);
      if(!respuesta){
         return message.success('Bienvenido')
      }
      switch(respuesta){
         case 'auth/email-already-in-use':
            message.error('El correo ya esta en uso')
            break
         default:
            message.error('Intentar nuevamente')
      }
    };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   const validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('Por favor ingresa la contraseña');
      } 
      if (value !== formState.password) {
        return Promise.reject('No coinciden las contraseñas');
      } 
        return Promise.resolve();
   }
   
 </script>

<template>
   <h1 class="text-center">Register</h1>
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

            <a-form-item
               label="Repita la contraseña:"
               name="repassword"
               :rules="[{ validator: validatePass }]"
            >
               <a-input-password v-model:value="formState.repassword"/>
            </a-form-item>


            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
               <a-button 
                  type="primary" 
                  html-type="submit" 
                  :disabled="userStore.loadingUser"
                  :loading = "userStore.loadingUser"
                  >Ingresar
               </a-button>
            </a-form-item>
         </a-form>
      </a-col>
   </a-row>
</template>
