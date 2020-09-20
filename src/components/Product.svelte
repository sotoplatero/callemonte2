<script >
	import { onMount } from 'svelte';	
	// import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher();	

	export let product
	let updating
	let site

	$: site = product.url.match(/bachecubano|revolico|porlalivre|timbirichi|1cuc|merolico|hogarencuba/);

	$: date = product.date ? new Date(product.date).toLocaleDateString("en-GB",{
	     year: "2-digit",
	     month:"2-digit",
	     day:"2-digit"
     }) : '';

	onMount(() => {
	});

	async function handleUpdate() {
	    if (!product.updated) {
	    	updating = true
	        let url = `/.netlify/functions/details?url=${product.url}`
			let response = await fetch(url)
	    	updating = false
	    	if (response.ok) {
				let data = await response.json();
				product = {...product, ...data, updated: true} 
	    	}
		}
	}

</script>
<article>
	<div class="relative px-2 sm:px-4 py-5 bg-white dark:bg-gray-800 flex w-full">
	    <a href="{product.url}" title="Anuncio Original: {product.title}" rel="nofollow noreferer" target="_blank"> 
		    <img 
		    	alt="{site}"
		        src="/static/fav/{site}.png" 
		        class="mr-3 h-8 w-8 rounded">
	    </a>

	    <div 
		    class="w-full min-w-0 { product.updated ? '' : 'cursor-pointer'}" 
		    on:click="{handleUpdate}"
	    >
	        <div class="leading-none mr-2 whitespace-no-wrap w-full truncate space-x-1">

	            <span class="font-bold">
		            $ { product.price }
		        </span>

	            <span class="font-normal text-sm text-gray-500 space-x-2" >
		            {#if product.date}
		                <span>{ date }</span>
		            {/if}
		            {#if product.location}
		                <span>{ product.location }</span>
		            {/if}
	            </span>

	        </div>

	        <p class="title font-semibold text-sm sm:text-base" >
				{product.title}
	        </p>
	        {#if product.description}
		        <p class="text-sm mt-1 text-gray-700 dark:text-gray-400">
		        	{product.description}
		        </p>
	        {/if}
	        
	        {#if product.phones}
				<div  class="flex flex-wrap mt-2">
					{#each product.phones as phone}
						<a href="tel:{phone}" class="flex items-center inline-flex py-1 px-2 rounded bg-blue-100 dark:bg-gray-700 text-blue-500 mr-1 mt-1">
							<svg class="h-4 w-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>    
							<span class="ml-1 text-sm font-mono font-semibold">{phone}</span>
						</a>
					{/each}
				</div>
	        {/if}

	        {#if product.updated && product.photo}
		        <div class="relative pb-3/4 mt-2 dark:bg-gray-700" >
		          <img 
		              class="absolute h-full w-full object-cover rounded-lg" 
		              src="{product.photo}" 
		              alt="{product.title}"
	              >
		        </div>	        
	        {/if}

	    </div>

	    {#if updating}
	        <div class="absolute text-white flex items-center justify-center top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-800 bg-opacity-75 z-100">
				<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>	            
	        </div>	    
	    {/if}
	</div>	
</article>