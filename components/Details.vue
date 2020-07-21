<template>
    <cm-modal :showing="show" v-on:close="$emit('close')">

        <div class="card-img-top aspect-ratio-box" v-if="product.photo">
          <a href="#" class="aspect-ratio-box-inside">
            <img :src="product.photo === true ? placeholderImage : product.photo" :alt="product.title" >
          </a>
        </div>

          <div class="" style="" >


            <div class="">
              <div class="">
                <div class="mr-2">

                    <span>
                        <span class="text-gray-600 font-normal">$</span>
                        {{ product.price }}
                    </span>

                    <span class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide space-x-2">
                      <span v-if="product.location">{{ product.location }}</span>
                      <span v-if="product.date">{{ product.date }}</span>
                    </span>

                    <img :src="'/fav/'+product.site+'.png'" class="z-0 ml-2 h-4 w-4 inline opacity-50 hover:opacity-100">

                </div>

                <div class="" >
                  <a :href="product.url" class="" target="_black" rel="noopener noreferrer">
                     {{product.title}}
                  </a>
                </div>

                <p class="font-normal mt-4" v-if="product.description">
                    {{ product.description }}
                </p>

                <a :href="'tel:' + phone" v-if="product.phones.length"  v-for="phone in product.phones">
                    {{ phone }}
                </a>
                
              </div>
            </div>
          </div>
<!-- 
            <button class="btn btn-light text-uppercase ml-2" @click.prevent="hide">Eliminar</button>
            <a 
              :href="'tel:' + product.phones[0]" 
              v-if="product.phones && product.phones.length" 
              class="btn btn-success">
              <b>Llamar</b>
            </a>            
        <button 
            class="bg-gray-200 hover:bg-gray-300 font-bold py-3 px-6 rounded focus:outline-none text-gray-800"  
            v-on:click.prevent="$emit('close')"
        >Cancelar
        </button> -->
      
    </cm-modal>
            
</template>

<script>
import { mapActions } from 'vuex'
import CmModal from './base/CMModal';

export default {
    components: { CmModal },
	props: [ 'currentProduct', 'showDetails' ],
	data(){
		return {
			loading: false,
			placeholderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII='
		}
	},
	computed: {
        show: function() {
          return this.showDetails;
        },
		product: function() {
            return this.currentProduct;
			// let url = this.currentProduct.url
			// return this.$store.state.products.items.find( el => el.url === url )
		}
	},
    watch: {
        currentProduct (val, oldVal) {
            console.log(val)
            if (val) {
               this.$store.commit('products/update',this.currentProduct) 
            }
        }
    },    
	methods: {
	    ...mapActions({ updateProduct: 'products/update' }),
	}

};

</script>

<style>
  .aspect-ratio-box {
    height: 0;
    overflow: hidden;
    padding-top: 75%;
    background: white;
    position: relative;
  }

  .aspect-ratio-box-inside {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .aspect-ratio-box-inside img {
    width: 100%;
    height: 100%;
    object-fit: cover; /*magic*/
  }
</style>
