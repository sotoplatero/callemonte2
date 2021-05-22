<script >
	import Hidden from "./Hidden.svelte";	
	import Favorite from "./Favorite.svelte";	

	export let product
	let updating
	let site 

	$: site = product.url.match(/bachecubano|revolico|porlalivre|timbirichi|1cuc|merolico|hogarencuba|ricurancia/);

	$: date = product.date ? new Date(product.date).toLocaleDateString("en-GB",{
	     year: "2-digit",
	     month:"2-digit",
	     day:"2-digit"
     }) : '';

</script>
<article class="
	{ product.isHidden ? 'opacity-25' : '' }
	{ product.isHidden || !product.phones.length ? 'print:hidden' : '' }
">
	<div class="flex relative pl-3 pr-10 py-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 w-full">
		{#if product.hide}
			<div class="px-10 flex justify-between w-full">
				<div>Anuncio Oculto</div> 
				<Hidden bind:product />
			</div>
		{:else}
			<div class="flex-shrink-0 h-7 w-7 mr-3">
			    <img 
			    	alt="{site}"
			        src="/static/fav/{site}.jpg" 
			        class="h-7 w-7 rounded block">
			</div>
		    <div class="w-full ">
		    	
			    <div class="min-w-0" >

			        <a 
		                href="{product.url}" 
		                title="Abrir la página del anuncio"
		                target="_blank" 
		                rel="noreferer nofollow"
		                class="hover:text-gray-800 dark:hover:text-gray-200"
			        >
						<p class="leading-none whitespace-no-wrap w-full truncate space-x-1">
							<span class="font-normal text-xs text-gray-400 dark:text-gray-500 space-x-2" >
								{#if product.date}
									<span class="font-semibold">{ date }</span>
								{/if}
								{#if product.location}
									<span class="uppercase">{ product.location }</span>
								{/if}
							</span>
						</p>

				        <p class="title font-bold "  >
				            <span class="mr-auto">
					            $ { product.price }
					        </span>
					        <span class="font-extrabold text-gray-600">-</span>
							<span class="">{product.title}</span>
				        </p>
				        {#if product.description}
					        <p class="text-gray-700 dark:text-gray-300">
					        	{product.description}
					        </p>
				        {/if}
			        	
			        </a>
			        
			        {#if product.phones.length > 0}
						<div  class="flex flex-wrap mt-2">
							{#each product.phones as phone}
								<a href="tel:{phone}" class="flex items-center inline-flex py-1 px-2 rounded bg-blue-100 dark:bg-gray-700 text-blue-500 mr-1 mt-1">
									<svg class="h-4 w-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>    
									<span class="ml-1 text-sm font-mono font-semibold">{phone}</span>
								</a>
							{/each}
						</div>
			        {/if}

			        {#if product.photo}
				        <div class="relative pb-3/4 mt-2 dark:bg-gray-700 rounded-xl overflow-hidden" >
				          <img 
				              class="absolute h-full w-full object-cover " 
				              src="{product.photo}" 
				              alt="{product.title}"
				              loading="lazy"
			              >
				        </div>	        
			        {/if}
			    </div>

		        <div class="print:hidden flex space-x-6 text-sm mt-2 text-gray-700 dark:text-gray-300 font-bold mt-4" >

					<Favorite bind:product />
					<Hidden bind:product />
		            <a 
						href="/api/pdf?url={product.url}" 
		                class="flex items-center text-sm visited:text-purple-600 hover:text-blue-500" 
		                title="Descargar PDF"
						target="_blank"
						download="{product.title}.pdf"
	                >
						<svg class="h-6 w-6 inline"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
						</svg>	
						<span class="hidden sm:inline ml-1">Descargar</span>
		            </a>  

		        </div>
		        <div class="notes hidden print:block print:h-20"></div>
		    </div>
		{/if}
	</div>	
</article>