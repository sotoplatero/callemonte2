<template>
<cm-modal :showing="showing" v-on:close="$emit('close')" size="w-56">
	<a href="/favorites">Favorites</a>
</cm-modal>
</template>
<script>
	import CmModal from './base/CMModal';
export default {
	props: ['showMenu'],
	components: {CmModal},
	data() {
		return {
		}
	},
	computed: {
		showing: function () {
		    return this.showMenu;
		}
	},	
};
</script>
