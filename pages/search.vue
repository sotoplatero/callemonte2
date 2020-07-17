<template>
  <div> 
    <div v-if="productsCount > 0" class="content-result">

      <div class="d-flex tool my-3 align-items-center ">
        <span>{{ productsCount }} Resultados</span>
        <!-- <a href >{{ hidesCount }} <TrashIcon size="1.1x" ></TrashIcon></a> -->
        <a href="https://notificon.com" target="_blank" class="ml-auto"><b>Crea una alerta</b></a>                
      </div>

      <ul class="space-y-1" id="products">
        <li 
            class="product flex font-semibold px-3 py-4 rounded-lg hover:bg-gray-200"  
            :class="product.updated ? 'bg-secondary text-white' : ''"
            v-for="(product,index) in filteredProducts" >

          <!-- <div class="card-body d-flex align-items-center px-2 py-3"> -->



            <a 
                href 
                class="flex mr-auto" 
                v-on:click.prevent="openDetails(product)" 
                :class="product.updated ? 'text-white' : ''"
            >


                <span class="font-bold mr-2 ">
                    <span class="text-gray-600 font-normal">$</span>{{ product.price }}
                </span>

              <span class="title text-blue-600 hover:text-blue-700" v-html="product.htmlTitle"></span>

            </a>

            <button 
                class="ml-2 md:ml-4 w-6 h-6 leading-none"  
                :class="product.favorite ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500' "
                v-on:click="$store.commit('products/toggleFavorite',product)"
            >
                <svg class="h-6 w-6 fill-current"  fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <!-- <img :src="'/fav/'+product.site+'.png'" class=""> -->
            </button>
      
        </li>
      </ul>

      <Details :selectedProduct="selectedProduct"></Details>
        
      <div class="row mt-3">
        <div class="col-12 mb-4" > 
          <button class="p-4 bg-green-500 text-white block w-full rounded-lg text-center" @click="next" :disabled="$store.state.products.searching">
            <b-spinner type="grow" small v-if="$store.state.products.searching"></b-spinner>   
            <b>Vamos por más</b>
          </button>
        </div>
      </div>

      <div class="text-center mt-3 mb-5">
        <div class="mb-3"><b>Si te gustó Callemonte compártelo y corre la bola.</b></div>
        <social-sharing url="https://callemonte.com/" title="Callemonte. Buscador de clasificados" description="Busca clasificados en los sitios de Cuba y ahorra tus datos" inline-template>  
          <div class="d-flex justify-content-center">
            <network network="twitter" class="mr-4" style="cursor: pointer;">
                <img width="32" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" title="Twitter" att="Twitter"/> 
            </network> 
            <network network="facebook" class="mr-4" style="cursor: pointer;">
              <img width="32" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" title="Facebook" att="Twitter"/> 
            </network>                        
            <network network="telegram" class="mr-4" style="cursor: pointer;">
              <img width="32" src="https://unpkg.com/simple-icons@latest/icons/telegram.svg" title="Telegram" att="Twitter"/> 
            </network>     
            <network network="whatsapp" style="cursor: pointer;">
              <img width="32" src="https://unpkg.com/simple-icons@latest/icons/whatsapp.svg" title="Whatsapp" att="Twitter"/> 
            </network>     
          </div>    
          </social-sharing>  
      </div>

           
    </div>
    <div v-else class="mt-3 card border-0">
      <div class="card-body p-4 text-center">
        Vaya!!! No hay resultados.
      </div>
    </div>

  </div>

</template>

<script>
import Details from '~/components/Details';
import Footbar from '~/components/Footbar'; 
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  components: { Details, Footbar },
  // watchQuery: true, 
  fetch() {
    this.$nuxt.context.store.dispatch('products/search', this.$nuxt.context.query );
  },  
  head() {
    return {
      htmlAttrs: { class: 'padding-top' }
    }
  },  
  data(){
    return {
      p: 1,
      selectedProduct: null,
      placeholderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII='      
    }
  },
  created(){
    this.searchProducts( this.$route.query );
  },
  watch: {
    '$route.query': '$fetch'
  },  
  computed: {
    ...mapGetters({ productsCount: 'products/productsCount' }),
    ...mapGetters({ hidesCount: 'products/hidesCount' }),
    filteredProducts(){
      let products = this.$store.state.products.items
      return products
        .filter( el => !el.hide )
        // .sort( (a,b) => b.score - a.score || a.price - b.price )      
    },
  },
  methods: {
    ...mapActions({ searchProducts: 'products/search' }),  
    ...mapActions({ updateProduct: 'products/update' }),  
    next() {
      this.p ++;
      this.searchProducts( {...this.$route.query, p: this.p} )
    },
    openDetails( product ) {
      this.selectedProduct = product,
      this.$bvModal.show('modal-show')
    },  
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