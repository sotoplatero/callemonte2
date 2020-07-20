<template>
<Transition name="fade">
    <div
        v-if="showing"
        class="fixed inset-0 w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 px-2"
        @click.self="close"
    >
        <div class="relative  max-w-2xl w-full md:w-2/5 bg-white dark:bg-gray-800 border-0 shadow-xl rounded-lg p-8">

            <button
                aria-label="close"
                class="absolute top-0 right-0 text-xl text-gray-600 my-2 mx-4" 
                @click.prevent="close"
            >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            </button>

            <slot />

        </div>
    </div>
</Transition>
</template>

<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden');
      }
      document.querySelector('body').classList.remove('overflow-hidden');
    }
  },  
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
	  transition: all 0.6s;
	}
	.fade-enter,
	.fade-leave-to {
	  opacity: 0;
	}
</style>