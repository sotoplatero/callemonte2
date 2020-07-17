<template>
  <div> 
    <div v-if="productsCount > 0" class="content-result">

        <div class="d-flex tool my-3 align-items-center ">
            <span>{{ productsCount }} Resultados</span>
            <!-- <a href >{{ hidesCount }} <TrashIcon size="1.1x" ></TrashIcon></a> -->
            <a href="https://notificon.com" target="_blank" class="ml-auto"><b>Crea una alerta</b></a>                
        </div>

        <ul class="space-y-3 mx-2" id="products">
            <Product :product="product" v-for="(product,index) in filteredProducts" :key="index"/>
        </ul>

        <button 
            class="p-4 bg-green-500 text-white block w-full rounded-lg text-center " 
            :class="$store.state.products.searching ? 'opacity-50' : ''"
            @click="next" 
            :disabled="$store.state.products.searching"
        >
            <b>Vamos por más</b>
        </button>

        <Details :selectedProduct="selectedProduct" :showing="showDetails" v-if="showDetails"></Details>
        

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
import Product from '~/components/Product'; 
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  components: { Details, Product },
  // watchQuery: true, 
  fetch() {
    this.$nuxt.context.store.dispatch('products/search', this.$nuxt.context.query );
  },  
  head() {
    return {
      htmlAttrs: { class: 'pt-20 dark:bg-gray-900 dark:text-gray-100' }
    }
  },  
  data(){
    return {
      showDetails: false,
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
      this.showDetails = true;
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