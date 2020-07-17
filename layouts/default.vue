<template>
  <div class="dark:bg-gray-900">
    <Navbar />  
    <div class="">
      <div class="w-full sm:w-1/2 mx-auto ">
          <nuxt/>
      </div>
      <footer >
        <div class="w-full sm:w-1/2 mx-auto text-center font-semibold py-10" >
          <div class="space-x-4">
            <nuxt-link to="/" class=" ">
              <span>Inicio</span>
            </nuxt-link>
            <nuxt-link to="/about" class=" ">
              Nosotros
          </nuxt-link>
            <nuxt-link to="/contact" class=" ">
              Contacto
          </nuxt-link>        
            
          </div>
          
        </div>
      </footer>
    </div>
    
  </div>
</template>
<script>
import Navbar from '~/components/Navbar';
export default {
  components: { Navbar },
}
</script>

