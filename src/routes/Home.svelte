<script>
	import { onMount } from 'svelte';
	import Product from "../components/Product.svelte";
	// import Menu from "../components/Menu.svelte";
	import Theme from "../components/Theme.svelte";
	import Filter from "../components/Filter.svelte";
	import Spin from "../components/Spin.svelte";
	import Pagination from "../components/Pagination.svelte";

	import queryString from 'query-string';	

	let filters = {
		q: '',
		pmin: 1,
		pmax: '',
		page: 1,
		province: ''
	}

	let products = [];

	let searching = 0;

	$: isSearching = searching > 0;

	onMount( () => {
		filters = { 
			...filters, 
			...queryString.parse(location.search)
		};
		if ( filters.q ) search();

		document.addEventListener('keydown', handleKeypress)
	});
	
	function handleSearch() {
		history.pushState(filters, '', '?' + queryString.stringify(filters)) ;
		window.scrollTo(0, 0);
    search();
	}

	function search() {
		if ( !filters.q || filters.q.length === 0) {
			return;
		} 
		
	    const sites = [ 'porlalivre','timbirichi','1cuc','merolico','hogarencuba','ricurancia','revolico' ];
		
	    searching = sites.length;
			products = [];

	    let { q, pmin, pmax, page, province } = filters;
		
	    sites.forEach( site => {
			let url = `/api/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${page}&province=${province}`

			fetch(url)
				.then( r => r.json() )
			  	.then( data => {
					products = [...products, ...data ]
						.filter( p => p.score > 0.1 )
						.sort( (a, b) => ( b.date + b.score ) - ( a.date + a.score ) )
			  	})
			  	.catch( (error) => {} )
			  	.then( () => searching = searching - 1 );
	    })

	}

	function handleKeypress(event) {

	    if ( event.key == '/'	) 
	    {
	   		event.preventDefault()
	   		document.querySelector('[name="q"]').focus()
	    }

	}	

</script>

<main>

<div class="min-h-screen flex items-center justify-center ">
  <div class="max-w-2xl mx-auto w-full mb-10">

    <div>
      <h2 class="mt-6 text-center text-3xl sm:text-6xl leading-9 font-extrabold ">
        <a href="/">Calle<span style="color: #00AA00;">Monte</span></a>
      </h2>
      <p class="mt-3 text-center text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-lg sm:mx-auto my-5 md:text-xl lg:mx-0">
          El buscador de clasificados en Cuba.
      </p>

    </div>
    <div class="py-2 sticky top-0 z-50 bg-white dark:bg-gray-900 transition duration-300">

			<form on:submit|preventDefault={handleSearch} class="group bg-white dark:bg-gray-800 shadow transition duration-300" >
				<div class="max-w-10xl mx-auto flex">
					<input bind:value={filters.q} type="text" name="q" id="search-input" placeholder="¿Qué quieres comprar?" class="flex-auto bg-transparent py-5 pl-2 sm:pl-4 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"  autocomplete="off">
					{#if searching > 0}
						<Spin />
					{/if}			

					<button type="submit" for="search-input" class="flex-none flex items-center px-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
						<span class="sr-only">Search all <!-- -->230<!-- --> icons</span>
						<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-gray-400 group-focus-within:text-gray-600 transition-colors duration-150">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</button>
				</div>
			</form>
    	
    </div>


	{#if products.length}

    <div class="flex justify-between items-center py-4">
    	{products.length} Anuncios
 			<Filter 
	 			bind:value={filters} 
	 			on:filter={handleSearch}
 			/>
    </div>

		<div class="divide-y divide-gray-100 dark:divide-gray-900 shadow overflow-hidden mb-4">

			{#each products as product (product.url)}
				<Product product={product} />
			{/each}

		</div>
		
		<Pagination {filters} {searching} />

	{/if}
	<footer class="text-center space-x-4 text-gray-500 mt-6">
		<Theme/>
		<a href="https://medium.com/callemonte" target="_blank">blog</a>
		<a href="https://twitter.com/@callemonte" target="_blank">@callemonte</a>
		<a href="https://github.com/sotoplatero/callemonte" target="_blank">Código</a>
	</footer>
  </div>
</div>
</main>

