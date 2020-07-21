<template>
  <div class="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
    <div class="w-full md:w-3/4 lg:w-1/2 mx-auto px-2">
        <nuxt/>
    </div>
    <Footbar/>
  </div>
</template>
<script>
import Footbar from '~/components/Footbar';
export default {
  components: {  Footbar },
}
</script>
