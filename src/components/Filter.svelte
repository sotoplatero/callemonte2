<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let show = false

	let	provinces ={
		'': 'Todas',
		'pinar-del-rio': 'Pinar del Rio',
		'la-habana': 'La Habana',
		'artemisa': 'Artemisa',
		'mayabeque': 'Mayabeque',
		'isla-de-la-juventud':'Isla de la Juventud',
		'matanzas': 'Matanzas',
		'cienfuegos': 'Cienfuegos',
		'villa-clara':'Villa Clara',
		'santi-spiritus':'Santi Spiritus',
		'ciego-de-avila': 'Ciego de Ávila',
		'camaguey':'Camagüey',
		'las-tunas':'Las Tunas',
		'holguin': 'Holguín',
		'granma':'Granma',
		'santiago-de-cuba':'Santiago de Cuba',
		'guatanamo':'Guatánamo',
	}	

	export let value;

	function filter() {
		dispatch('filter');
		show = false;
	}
</script>

<button 
	class="text-gray-300 hover:text-blue-600" 
	on:click|preventDefault="{ e => show = true}">
	<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path></svg>
</button>

{#if show}
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 transition-opacity" transition:fade>
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    {#if show}
      <div 
      	transition:fade
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

        <div class="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 space-y-4">

			<div class="">
				<label for="pmin" class="mb-1 block font-semibold text-sm">Precio Minimo</label>
				<input 
					type="text" 
					class="block appearance-none w-full bg-white dark:bg-gray-600 border dark:border-gray-500 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" 
					name="pmax" 
					bind:value={value.pmin}>
			</div> 

			<div class="">
				<label for="pmax" class="mb-1 block font-semibold text-sm">Precio Minimo</label>
				<input 
					type="text" 
					class="block appearance-none w-full bg-white  dark:bg-gray-600 border dark:border-gray-500 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" 
					name="pmax" 
					bind:value={value.pmax}>
			</div>   

			<div class="form-group">
				<label for="province" class="mb-1 block font-semibold text-sm">Provincia</label>
				<div class="block relative w-full">
				  <select class="block appearance-none w-full bg-white dark:bg-gray-600 border dark:border-gray-500 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" name="provice" bind:value={value.province}>
				  	{#each Object.entries(provinces) as province}
		            	<option value="{province[0]}">{province[1]}</option>
				  	{/each}
				  </select>
				  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
				    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
				  </div>
				</div>	            
			</div>   

        </div>

        <div class="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 font-semibold">

            <button type="button" class="justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:leading-5" on:click|preventDefault={ filter }>
              Filtrar
            </button>

            <button 
            	on:click|preventDefault="{ e => show = false}"
	            type="button" 
	            class="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-700 text-base font-semibold leading-6 text-gray-700 dark:text-gray-300 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cerrar
            </button>
        </div>
      </div>
      
    {/if}
  </div>
</div>
{/if}
