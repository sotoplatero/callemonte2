<template>
    <li 
        class="product flex font-semibold px-3 md:px-5 py-4 rounded-lg dark:bg-gray-800 dark:text-gray-100"  
        :class="product.updated ? 'bg-secondary text-white' : ''"
         >

        <div class="mr-auto flex-grow">
          <button 
              class="text-left w-full" 
              v-on:click.prevent="show">
            <div class="font-bold mr-2 ">

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

            <div class="">
                <span class="title text-gray-800 dark:text-gray-100 font-semibold" v-html="product.htmlTitle"></span>
                <a :href="product.url" class="ml-2 text-gray-500 hover:text-blue-500">
                    <svg class="h-4 w-4 fill-current inline"  fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                </a>
            </div>

            <p class="font-normal mt-2 dark:text-gray-400" v-if="product.description">
                {{product.description}}
            </p>
            
          </button>
          
        </div>

        <button 
            class="ml-2 md:ml-4 w-6 h-6 leading-none"  
            :class="product.favorite ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500' "
            v-on:click="$store.commit('products/toggleFavorite',product)"
        >
            <svg class="h-6 w-6 fill-current"  fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        </button>

        <ModalProduct 
            v-if="$store.state.products.currentProduct == product" 
            :show-details="$store.state.products.currentProduct == product"
            :current-product="$store.state.products.currentProduct" />
    </li>
    
</template>
<script>
import ModalProduct from '~/components/Details';
export default {
    components: { ModalProduct },
    props: [ 'product' ],
    data(){
        return {
          prevPath: '',
        }
    },
    methods: {
        show(){

            this.$store.commit('products/setCurrentProduct', this.product)
            console.log(this.$store.state.products.currentProduct == this.product)
        }
    }
}
</script> 