<template>
    <li 
        class="relative product font-semibold bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg overflow-hidden shadow"  
         >
        <div class="relative pb-2/3" v-if="product.updated && product.photo">
          <img 
              class="absolute h-full w-full object-cover" 
              :src="product.photo" 
              :alt="product.title"
              >
        </div>

        <div class="p-4 md:p-6 ">
            <div class="mr-auto">
              <button 
                  :disabled = "product.updated"
                  class="text-left w-full disabled:pointer-events-none" 
                  v-on:click.prevent="show">
                <div class="flex w-full">
                    
                    <img 
                        :src="'/fav/'+product.site+'.png'" 
                        class="mr-3 h-8 w-8 rounded">

                    <div class="w-full">
                        <div class="leading-none font-bold mr-2 whitespace-no-wrap w-full">
                            <span class="mr-2">$ {{ product.price }}</span>
                            <span v-if="product.location" class="font-normal text-gray-500 min-w-0" style="min-width: 0px;">
                                {{ product.location }}
                            </span>
                            <span class="font-normal text-gray-500 min-w-0" >
                                <span v-if="product.date" ><span class="text-sm">&bull;</span> {{ product.date }}</span>
                            </span>
                        </div>

                        <h2 
                            class="title text-gray-800 dark:text-gray-100 font-semibold" 
                            v-html="product.htmlTitle">
                        </h2>
                        
                    </div>
                </div>


                <p class="font-normal mt-2 dark:text-gray-400" v-if="product.description">
                    {{product.description}}
                </p>
                
              </button>
              <div  v-if="product.phones" class="space-x-2 mt-2">
                  <a :href="'tel:'+phone" v-for="phone in product.phones" class="inline-block py-1 px-4 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600">
                    <svg class="h-4 w-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>                                       
                    {{phone}}
                  </a>
              </div>
            </div>

            
        </div>      
        <div class="grid grid-cols-3 justify-around text-sm text-center pb-6 text-gray-600">

            <a 
                :href="product.url" 
                class="text-center uppercase font-bold text-sm visited:text-purple-600" 
                target="_blank" 
                rel="noreferer nofollow">

                <svg class="h-6 w-6 inline" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>

                <span class="hidden md:inline inline-block align-middle">
                    Visitar
                </span>

            </a>   

            <button 
                class="text-center uppercase font-bold text-sm"
                :class="isFavorite ? 'text-yellow-500' : '' "
                v-on:click="toggleFavorite"
            >   
                <svg class="h-6 w-6 inline" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>

                <span class="hidden md:inline inline-block align-middle">
                    Favorito
                </span>
                
            </button>

            <a 
                v-if="product.phones"
                :href="'tel:'+product.phones[0]"
                class="text-center disabled:text-gray-600 uppercase font-bold text-sm ">

                <svg class="h-6 w-6 inline"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>

                <span class="hidden md:inline  inline-block  align-middle">
                    Llamar
                </span>
                
            </a>
            
        </div>   
        <div v-if="updating" class="absolute text-white flex items-center justify-center top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-800 dark:bg-opacity-75 z-100" style="background: rgba(0, 0, 0, 0.4) !important;">
            <span>Descargando...</span>
        </div>
    </li>
    
</template>
<script>
var store = require('store/dist/store.modern');

export default {
    props: [ 'product' ],
    data(){
        return {
        }
    },
    mounted(){
        // this.$store.commit('favorites/clear')
        // console.log(this.$store.state.favorites.items);
    },
    computed: {
        updating() {
            return this.$store.state.products.updating.includes(this.product.url)
        },
        isFavorite() {
            return this.$store.state.favorites.items.some(el=>el.url==this.product.url);
        }
    },
    methods: {
        show(){
            if (!this.product.photo && !this.product.phones) {
                this.$store.dispatch('products/update',this.product) 
            } else {
                this.$store.commit('products/update', this.product)
            }
        },
        toggleFavorite() {
            this.$store.dispatch('products/update',this.product)
            this.$store.dispatch('favorites/toggle',this.product) 
        },
        visibilityChanged (isVisible, entry) {
          // this.isVisible = isVisible
          if (isVisible && this.product.updated) {
            this.show()
          }
          // console.log(isVisible)
        }        
    }
};
</script> 