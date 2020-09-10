<template>
  <div>
    <div v-if="filteredProducts.length > 0" class="content-result">
        <div class="d-flex tool my-3 align-items-center ">
            <span >{{ filteredProducts.length }} Resultados</span>
        </div>

        <ul class="space-y-2 mb-4" id="products">
            <Product :product="product" v-for="(product,index) in filteredProducts" :key="index"/>
        </ul>

        <button 
            class="p-4 bg-green-500 text-white block w-full rounded-lg text-center " 
            :class="searching ? 'opacity-50' : ''"
            @click="next" 
            :disabled="searching"
            v-if=" ! $store.state.favorites.show "
        >
            <b>Vamos por más</b>
        </button>

    </div>
    <div v-else class="mt-3 card border-0">

      <div class="py-20 px-6 bg-white dark:bg-gray-800 text-center rounded-lg font-semibold shadow text-lg">

        <div v-if="searching">
            <svg class="h-10 w-10 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path></svg>   
            Buscando...
        </div>
        <div v-else>
            <svg class="h-10 w-10 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>        
            Opss!!! No hay resultados.
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import Product from '~/components/Product'; 
import { mapActions } from 'vuex'

export default {
  components: { Product },
    head(){
        return {
            bodyAttrs: {
                class:  'pt-20 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
            }, 
        }    
    },
    // watchQuery: true,
    watchQuery(newQuery, oldQuery){
      console.log(newQuery)
      this.searchProducts( newQuery );
      return true
    },
    created() {
      this.searchProducts( this.$nuxt.context.query );
    },  
    data(){
      return {
        p: 1,
      }
    },
    computed: {
      filteredProducts(){
        let products = [...this.$store.state.products.items]
        return this.$store.state.favorites.show ? 
                this.$store.state.favorites.items :
                  products.sort( (a,b) => (b.score - a.score || a.price - b.price) )      
      },
      searching() {
          return  (this.$store.state.products.searching.length > 0)
      }
    },

    methods: {
      ...mapActions({ searchProducts: 'products/search' }),  
      next() {
        this.p ++;
        this.searchProducts({ ...this.$route.query, p: this.p })
      }, 
    }
  }
</script>
