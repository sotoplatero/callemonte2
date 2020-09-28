<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let filters;
	export let searching;

	function handlePaginate(step) {
		filters.page = parseInt(filters.page) + parseInt(step);

		dispatch('paginate');
	}
</script>

<div class="flex justify-between">

	<button 
	    class="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-lg text-center disabled:opacity-75" 	
	    disabled={ searching > 0 || filters.page == 1}
	    on:click="{ e => { if (filters.page > 1) handlePaginate(-1) } }" 
	>
		<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
	</button>

	<button 
	    class="py-2 px-4 bg-gray-700 hover:bg-gray-600 hover:text-gray-200 text-gray-400 rounded-lg text-center { searching > 0 ? 'opacity-75' : ''}" 
	    on:click="{ e => handlePaginate(1) }" 
	    disabled={ searching > 0 }
	>
		<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
		</svg>			    
	</button>

</div>	