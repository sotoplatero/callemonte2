<template>
  <div
    v-if="showing"
    class="fixed inset-0 w-full h-screen flex items-center justify-center "
    @click.self="close"
  >
    <div class="relative max-w-2xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl rounded-lg p-8 border">
      <button
        aria-label="close"
        class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4" 
        @click.prevent="close"
      >
        ×
      </button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean
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
	  transition: all 0.4s;
	}
	.fade-enter,
	.fade-leave-to {
	  opacity: 0;
	}
</style>