<template>
  <div class="bg-gray-100 dark:bg-gray-900">
    <Navbar />  
    <div class="">
      <div class="w-full max-w-3xl mx-auto px-2">
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
        class:  'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
      }      
    } 
  }, 
  mounted() {
    this.$colorMode.preference = this.$colorMode.value;
  }
};
</script>

