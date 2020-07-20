<template>
  <div class="bg-gray-100 dark:bg-gray-900">
    <Navbar />  
    <div class="min-h-screen">
      <div class="w-full md:w-3/4 lg:w-1/2 mx-auto px-2">
          <nuxt/>
      </div>
      <Footbar/>
    </div>
    
  </div>
</template>
<script>
import Navbar from '~/components/Navbar';
import Footbar from '~/components/Footbar';
export default {
  components: { Navbar, Footbar },

  head() {
    return {
      htmlAttrs: {
        class: 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
      },
      bodyAttrs: {
        class:  'pt-20 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
      }      
    } 
  } 
}
</script>

