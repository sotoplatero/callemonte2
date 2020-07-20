<template>
<cm-modal :showing="showing" v-on:close="$emit('close')">
</cm-modal>
</template>
<script>
export default {
	props: ['show'],
	data() {
		return {
		}
	},
	computed: {
		showing: function () {
		    return this.show;
		}
	},	
};
</script>
