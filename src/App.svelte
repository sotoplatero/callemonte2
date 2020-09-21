<script>
	import { onMount } from 'svelte';

	import Tailwindcss from "./Tailwindcss.svelte";
	import Product from "./components/Product.svelte";
	import Filter from "./components/Filter.svelte";

	import queryString from 'query-string';	
	import FlexSearch from './functions/libs/Flexsearch';
	import stemmer_es from 'stemmer_es';

	let filters = {
		q: '',
		pmin: 1,
		pmax: '',
		page: 1,
		province: ''
	}

	let products = [];

	let searching = 0;

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
		history.pushState(filters, '', '?' + queryString.stringify(filters)) ;
		window.scrollTo(0, 0);
	    search();
	}
	
	function search() {
		if ( !filters.q || filters.q.length === 0) {
			return;
		} 
		
	    const sites = [ 'bachecubano','revolico','porlalivre','timbirichi','1cuc','merolico','hogarencuba' ];
		
	    searching = sites.length;
		
	    let { q, pmin, pmax, page, province } = filters;
		
		let indexProducts = new FlexSearch({
			profile: "score",
			stemmer: (value) => stemmer_es.stem(value),
		 	filter: 'a al algo algunas algunos ante antes como con contra cual cuando de del desde donde durante e el ella ellas ellos en entre era erais eran eras eres es esa esas ese eso esos esta estaba estabais estaban estabas estad estada estadas estado estados estamos estando estar estaremos estará estarán estarás estaré estaréis estaría estaríais estaríamos estarían estarías estas este estemos esto estos estoy estuve estuviera estuvierais estuvieran estuvieras estuvieron estuviese estuvieseis estuviesen estuvieses estuvimos estuviste estuvisteis estuviéramos estuviésemos estuvo está estábamos estáis están estás esté estéis estén estés fue fuera fuerais fueran fueras fueron fuese fueseis fuesen fueses fui fuimos fuiste fuisteis fuéramos fuésemos ha habida habidas habido habidos habiendo habremos habrá habrán habrás habré habréis habría habríais habríamos habrían habrías habéis había habíais habíamos habían habías han has hasta hay haya hayamos hayan hayas hayáis he hemos hube hubiera hubierais hubieran hubieras hubieron hubiese hubieseis hubiesen hubieses hubimos hubiste hubisteis hubiéramos hubiésemos hubo la las le les lo los me mi mis mucho muchos muy más mí mía mías mío míos nada ni no nos nosotras nosotros nuestra nuestras nuestro nuestros o os otra otras otro otros para pero poco por porque que quien quienes qué se sea seamos sean seas seremos será serán serás seré seréis sería seríais seríamos serían serías seáis sido siendo sin sobre sois somos son soy su sus suya suyas suyo suyos sí también tanto te tendremos tendrá tendrán tendrás tendré tendréis tendría tendríais tendríamos tendrían tendrías tened tenemos tenga tengamos tengan tengas tengo tengáis tenida tenidas tenido tenidos teniendo tenéis tenía teníais teníamos tenían tenías ti tiene tienen tienes todo todos tu tus tuve tuviera tuvierais tuvieran tuvieras tuvieron tuviese tuvieseis tuviesen tuvieses tuvimos tuviste tuvisteis tuviéramos tuviésemos tuvo tuya tuyas tuyo tuyos tú un una uno unos vosotras vosotros vuestra vuestras vuestro vuestros y ya yo él éramos'.split(' '),	
		    doc: {
		        id: "url",
		        field: [ "title", "description" ]
		    }
		});
	    sites.forEach( async site => {
			let url = `/api/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${page}&province=${province}`
			const response = await fetch(url)
			searching = searching - 1;
			
			if (response.ok) {
				const productsSite = await response.json();
				indexProducts.add(productsSite);
				products = indexProducts.search( filters.q, {
				    sort: (a, b) => parseInt(b.date) - parseInt(a.date)					
				}) 
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
          El buscador de clasificados en Cuba.
      </p>
    </div>
    <div class="sticky top-0 py-2 bg-white dark:bg-gray-900 dark:text-gray-100 z-10">

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
					autocomplete="off"
					on:keypress={ e => { if (e.key == 'Enter') handleSearch() } }
					class="w-full bg-white dark:bg-gray-800 appearance-none focus:outline-none" 
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
		{#if products}
			{#each products as product (product.url)}
				<Product product={product} />
			{/each}
		{/if}
	</div>

  </div>
</div>
</main>
