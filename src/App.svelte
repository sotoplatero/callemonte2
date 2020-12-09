<script>
	import { onMount } from 'svelte';
	import TailwindCss from './Tailwindcss.svelte'
	import Product from "./components/Product.svelte";
	// import Menu from "./components/Menu.svelte";
	import Theme from "./components/Theme.svelte";
	import Filter from "./components/Filter.svelte";
	import Spin from "./components/Spin.svelte";
	import Pagination from "./components/Pagination.svelte";

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
		
	    const sites = [ 'bachecubano','porlalivre','timbirichi','1cuc','merolico','hogarencuba','ricurancia','revolico' ];
		
	    searching = sites.length;
		products = [];

	    let { q, pmin, pmax, page, province } = filters;
		
	    sites.forEach( site => {
			let url = `/api/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${page}&province=${province}`

				fetch(url)
				.then( r => r.json() )
			  	.then( data => {
					products = [...products, ...data ]
						.filter( p => p.score > 0.1)
						.sort( (a, b) => (b.date+b.score) - (a.date+a.score) )
			  	})
			  	.catch( (error) => {} )
			  	.then( () => searching = searching - 1 );
	    })

	}

</script>

<main>

<div class="min-h-screen flex items-center justify-center ">
  <div class="max-w-2xl mx-auto w-full mb-6">

    <div>
      <h2 class="mt-6 text-center text-3xl sm:text-6xl leading-9 font-extrabold ">
        Calle<span style="color: #00AA00;">Monte</span>
      </h2>
      <p class="mt-3 text-center text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-lg sm:mx-auto my-5 md:text-xl lg:mx-0">
          El buscador de clasificados en Cuba.
      </p>

    </div>

    <div class="sticky top-0 py-2 bg-white dark:bg-gray-900 dark:text-gray-100 z-10" id="top">

      <div class="flex items-center w-full appearance-none shadow print:shadow-none print:bg-white rounded-none p-3 sm:p-4 text-lg border-gray-300 placeholder-gray-500 text-gray-900 dark:text-gray-100 sm:rounded-lg focus:outline-none focus:shadow-outline-green focus:border-green-300 focus:z-10 leading-5 bg-gray-100 dark:bg-gray-800 space-x-2">

          	<span class="my-auto text-gray-400">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>       	
          	</span>

          	<div class="flex-1">
				<input 
					bind:value={filters.q}
					aria-label="¿Qué quieres comprar?" 
					name="q" 
					type="text" 
					autocomplete="off"
					on:keypress={ e => { if (e.key == 'Enter') handleSearch() } }
					class="w-full bg-gray-100 dark:bg-gray-800 appearance-none focus:outline-none" 
					placeholder="¿Qué quieres comprar?">
          	</div>


			{#if searching > 0}
				<Spin />
			{/if}

 			<Filter 
	 			bind:value={filters} 
	 			on:filter={handleSearch}
 			/>

 			<!-- <Menu/> -->

       </div>

    </div>

	{#if products.length}

		<div class="divide-y divide-gray-100 dark:divide-gray-900 shadow rounded-lg overflow-hidden mb-4">

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
	</footer>
  </div>
</div>
</main>
