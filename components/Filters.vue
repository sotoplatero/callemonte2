<template>
      <cm-modal :showing="show" v-on:close="$emit('close')">
      	<div class="space-y-4">
	    	<div class="flex space-x-2">

				<div class="w-1/2">
					<label class="mb-2 block font-semibold">Precio Minimo</label>
					<input type="text" class="block appearance-none w-full bg-white dark:bg-gray-600 border border-gray-600 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" v-model="filters.pmin">
				</div> 

				<div class="w-1/2">
					<label class="mb-2 block font-semibold">Precio Minimo</label>
					<input type="text" class="block appearance-none w-full bg-white  dark:bg-gray-600 border border-gray-600 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" v-model="filters.pmax">
				</div>   

	    	</div>

			<div class="form-group">
				<label class="mb-2 block font-semibold">Provincia</label>
				<div class="block relative w-full">
				  <select class="block appearance-none w-full bg-white dark:bg-gray-600 border border-gray-600 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" v-model="filters.province">
	            	<option v-for="[key,name] in Object.entries(provinces)" :value="key">{{name}}</option>
				  </select>
				  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
				  </div>
				</div>	            
			</div>    

			<footer>
				<button class="bg-blue-600 hover:bg-blue-500 font-bold py-3 px-6 rounded focus:outline-none text-blue-100" v-on:click.prevent="apply">
					<b>Aplicar</b>
				</button>
<!-- 				<button class="bg-gray-200 hover:bg-gray-300 font-bold py-3 px-6 rounded focus:outline-none text-gray-800"  @click.prevent="$emit('close')">Cancelar</button> -->
			</footer>
      		
      	</div>
      	
      </cm-modal>
</template>
<script>
import CmModal from './base/CMModal';
export default {
	components: { CmModal },
	props: ['showFilters'],
	data() {
		return {
			filters: { 
				pmin: '', 
				pmax:'', 
				province:''
			},
			provinces: {
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
		}
	},
	watch: {
		showFilters: function(val, oldVal) {
			this.filters = { ...this.filters, ...this.$route.query }
		}
	},
	computed: {
		show: function () {
		    return this.showFilters;
		}
	},
	methods: {
		open(){
			this.filters = { ...this.filters, ...this.$route.query }
		},
		apply() {
			if (this.filters.pmin <=0) {
				this.filters.pmin=1
			}
			let filters = { ...this.$route.query, ...this.filters }
	        this.$router.push({ 
	          path: '/search', 
	          query: filters
	        })
	        this.$emit('close');
		}
	}

  }
</script>
