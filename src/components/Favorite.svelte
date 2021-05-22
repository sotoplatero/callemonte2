<script>
	import {config} from '../store'

	export let product;
	let favorites = $config.favorites || []
	$: product.favorite = favorites.some( el => el.url === product.url )

	function toggleFavorite() {
		product.favorite = !product.favorite
		favorites = product.favorite
			? [...favorites, product ]
			: favorites.filter( el => el.url !== product.url )

		$config = {...$config, favorites }
	}

</script>

<span>
	<button
		class="flex items-center text-left text-sm font-bold hover:text-blue-500 {product.favorite ? 'text-green-500' : ''}" 
		title="Seleccionar"
		on:click|preventDefault="{toggleFavorite}"
	>

		{#if product.favorite}

			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
			  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
			</svg>

		{:else}

			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
			</svg>
			
		{/if}
		<span class="hidden sm:inline ml-2">
			{ product.favorite ? 'Guardado' : 'Guardar' }
		</span>
	</button> 
</span>