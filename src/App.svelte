<script>
	import { onMount } from 'svelte';

	import Tailwindcss from "./Tailwindcss.svelte";
	import Product from "./components/Product.svelte";
	import Filter from "./components/Filter.svelte";
	import queryString from 'query-string';	
	import FlexSearch from './functions/libs/Flexsearch';


	let filters = {
		q: '',
		pmin: 1,
		pmax: '',
		page: 1,
		province: ''
	}

	let products = [];

	let searching = 0;

	let indexProducts = new FlexSearch({
	    stemmer: "es", 
	    filter: "es" ,	
	    doc: {
	        id: "url",
	        field: [ "title", "description" ]
	    }
	});

	
	$: filteredProducts = indexProducts ? indexProducts.search(filters.q) : [];

	onMount(() => {
		filters = { 
			...filters, 
			...queryString.parse(location.search)
		};
		
		if ( filters.q ) {
			search()
		}
	});

	function handleSearch() {
		history.pushState(filters, '', '?'+queryString.stringify(filters)) ;
		products = [];
	    search();
	}

	function search() {
		if ( !filters.q || filters.q.length === 0) {
			return;
		} 

	    const sites = [ 'bachecubano','revolico','porlalivre','timbirichi','1cuc','merolico','hogarencuba' ];

	    searching = sites.length;

	    let { q, pmin, pmax, page, province } = filters;

	    sites.forEach( async site => {
	        let url = `/api/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${page}&province=${province}`
			const response = await fetch(url)
			searching = searching - 1;

			if (response.ok) {
				const productsSite = await response.json();
				indexProducts.add(productsSite)
				filteredProducts = indexProducts.search(filters.q) 
				products = products.concat(productsSite)
			}
	    })

	}

</script>

<Tailwindcss />
<main>

<div class="min-h-screen flex items-center justify-center ">
  <div class="max-w-xl mx-auto w-full">

    <div>
      <!-- <img class="mx-auto h-12 w-auto" src="/static/logo.png" alt="Workflow"> -->
      <h2 class="mt-6 text-center text-3xl sm:text-6xl leading-9 font-extrabold ">
        Calle<span class="" style="color: #00AA00;">Monte</span>
      </h2>
      <p class="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto my-5 md:text-xl lg:mx-0">
          El buscador de clasificados más rápido del ejercito libertador.
      </p>
    </div>
    <div class="sticky top-0 py-2 dark:bg-gray-900 dark:text-gray-100 z-10">

      <div class="flex items-center w-full appearance-none shadow rounded-none p-3 sm:p-4 text-lg border-gray-300 placeholder-gray-500 text-gray-900 dark:text-gray-100 sm:rounded-lg focus:outline-none focus:shadow-outline-green focus:border-green-300 focus:z-10 leading-5 bg-white dark:bg-gray-800 space-x-2">

          	<span class="my-auto text-gray-400">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>       	
          	</span>

          	<div class="flex-1">
				<input 
					bind:value={filters.q}
					aria-label="¿Qué quieres comprar?" 
					name="q" 
					type="text" 
					autofocus
					on:keypress={ e => { if (e.key == 'Enter') handleSearch() } }
					class="w-full bg-white dark:bg-gray-800" 
					placeholder="¿Qué quieres comprar?">
          	</div>

          	<!-- <div class=""> -->

				{#if searching > 0}
					<span class="text-white">
						<svg class="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>	
					</span>
				{/if}

	 			<Filter bind:value={filters} on:filter={handleSearch}/>

          	<!-- </div> -->

<!-- 			<button>
// 				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
// 			</button> -->

      </div>

    </div>

	<div class="divide-y divide-gray-100 dark:divide-gray-900 shadow rounded-lg overflow-hidden mb-10">
		{#if filteredProducts}
			{#each filteredProducts as product }
				<Product 
					product={product} 
				></Product>
			{/each}
		{/if}
	</div>

  </div>
</div>
</main>
