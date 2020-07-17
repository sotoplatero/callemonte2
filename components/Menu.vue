<template>
	<div class="leading-none">
	    <button class="w-6 h-6 text-gray-700" type="button" @click="show = !show" >
			<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
	    </button>

		<div 
			class="absolute w-full left-0 top-0 bg-white p-6 space-y-4 shadow font-semibold text-gray-600 font-bold rounded-lg overflow-hidden" 
			:class="[ show ? 'block' : 'hidden' ]"
		> 
            <nuxt-link to="/" class="flex items-center block ">
            	<span class="w-6 h-6 text-gray-500 inline-block mr-4">
	            	<svg fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            	</span>
            	<span>Inicio</span>
            </nuxt-link>
            <nuxt-link to="/about" class="flex items-center block ">
            	<span class="w-6 h-6 text-gray-500 inline-block mr-4">
					<svg fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>            		
            	</span>
	            Nosotros
	        </nuxt-link>
            <nuxt-link to="/contact" class="flex items-center block ">
            	<span class="w-6 h-6 text-gray-500 inline-block mr-4">
					<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>            		
            	</span>
	            Contacto
	        </nuxt-link>
		</div>


	</div>	
</template>
<script>
export default {
	data() {
		return {
			show: false
		}
	}
};
</script>
