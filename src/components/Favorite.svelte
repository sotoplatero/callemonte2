<script>
	import Cookies from 'js-cookie'

	export let product;
	let favorites = (() => JSON.parse( Cookies.get('favorites') || '[]' ))();

	function handleFavorite() {
		if (favorites.some( el => el.url === product.url )) {
			favorites = favorites.filter( el => el.url !== product.url );
		} else {
			favorites = [...favorites, product];
		} 
	}

	$: Cookies.set('favorites', JSON.stringify(favorites));

	$: product.isFavorite = favorites.some( el => el.url === product.url );

</script>

<span>
	<button
		class="text-left text-sm hover:text-blue-500 {product.isFavorite ? 'text-orange-500' : ''}" 
		title="Ocultar"
		on:click|preventDefault="{handleFavorite}"
		>
		<svg class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
		</svg>
	
	</button> 
</span>