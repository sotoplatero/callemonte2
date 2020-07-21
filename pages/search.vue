<template>
  <div>
    <div v-if="productsCount > 0" class="content-result">

<<<<<<< HEAD
        <div class="d-flex tool my-3 align-items-center ">
            <span>{{ productsCount }} Resultados</span>
        </div>

        <ul class="space-y-2 mb-4" id="products">
            <Product :product="product" v-for="(product,index) in filteredProducts" :key="index"/>
        </ul>

        <button 
            class="p-4 bg-green-500 text-white block w-full rounded-lg text-center " 
            :class="searching ? 'opacity-50' : ''"
            @click="next" 
            :disabled="searching"
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
=======
      <div class="d-flex tool my-3 align-items-center ">
        <span>{{ productsCount }} Resultados</span>
        <!-- <a href >{{ hidesCount }} <TrashIcon size="1.1x" ></TrashIcon></a> -->
        <a href="https://notificon.com" target="_blank" class="ml-auto"><b>Crea una alerta</b></a>
      </div>

      <ul class="list-unstyled" id="products">
        <li
          class="product border-0 card mb-1 "
          :class="product.updated ? 'bg-secondary text-white' : ''"
          v-for="(product,index) in filteredProducts">

          <div class="card-body d-flex align-items-center px-2 py-3">
            <!--
              <a href
              @click.prevent="$store.commit('products/toggleFavorite',product)"
              class="align-baseline mr-2"
              :class="product.favorite ? 'text-warning' : ''">
              <StarIcon size="1.2x"></StarIcon>
            </a>
            -->
            <a class="flex-grow-1" href @click.prevent="openDetails(product)"
               :class="product.updated ? 'text-white' : ''">
              <span class="font-weight-bold">
                <span class="">$</span>{{ product.price }}
              </span>
              <span class="title" v-html="product.htmlTitle"></span>
              <img :src="'/fav/'+product.site+'.png'" width="15" class="ml-1 align-middle">
            </a>

            <div class="actions d-none d-sm-block ml-3">
              <a href @click.prevent="$store.commit('products/toggleHide',product)"
                 class="text-decoration-none "
                 :class="product.updated ? 'text-white' : 'text-secondary'"
                 title="Ocultar este resultado">
                <TrashIcon size="1.2x"></TrashIcon>
              </a>
            </div>
          </div>

        </li>
      </ul>

      <div class="row mt-3">
        <div class="col-12 mb-4">
          <button class="btn btn-success btn-block  py-3 border-0" @click="next"
                  :disabled="$store.state.products.searching">
            <b-spinner type="grow" small v-if="$store.state.products.searching"></b-spinner>
            <b>Vamos por más</b>
          </button>
        </div>
      </div>

      <Details :selectedProduct="selectedProduct"></Details>
      <Social/>

    </div>
    <div v-else class="mt-3 text-center">

      <b-spinner type="grow" variant="success" v-if="$store.state.products.searching"></b-spinner>
      <div class="card border-0" v-else>
        <div class="card-body p-4 text-center">
          Vaya!!! No hay resultados.
>>>>>>> 0e1ef1c95341fac1490ad0979aa30c864590b9d6
        </div>
      </div>

    </div>

  </div>

</template>

<script>
<<<<<<< HEAD
import Product from '~/components/Product'; 
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: { Product },
  // watchQuery: true, 
  fetch() {
    this.$nuxt.context.store.dispatch( 'products/search', this.$nuxt.context.query );
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
        .sort( (a,b) => b.score - a.score || a.price - b.price )      
    },
    searching() {
        return  (this.$store.state.products.searching.length > 0)
    }
  },
  methods: {
    ...mapActions({ searchProducts: 'products/search' }),  
    next() {
      this.p ++;
      this.searchProducts( {...this.$route.query, p: this.p} )
    }, 
  }
=======
  import Details from '~/components/Details';
  import Social from '~/components/Social';
  import {TrashIcon, StarIcon} from 'vue-feather-icons'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    components: {TrashIcon, Social, Details, StarIcon},

    fetch() {
      this.$nuxt.context.store.dispatch('products/search', this.$nuxt.context.query);
    },

    head() {
      return {
        htmlAttrs: {class: 'padding-top'}
      }
    },

    data() {
      return {
        p: 1,
        selectedProduct: null,
      }
    },

    created() {
      this.searchProducts(this.$route.query);
    },

    watch: {
      '$route.query': '$fetch'
    },

    computed: {
      ...mapGetters({productsCount: 'products/productsCount'}),
      ...mapGetters({hidesCount: 'products/hidesCount'}),
      filteredProducts() {
        let products = this.$store.state.products.items
        return products
          .filter(el => !el.hide)
          .sort((a, b) => b.score - a.score || a.price - b.price)
      },
    },
>>>>>>> 0e1ef1c95341fac1490ad0979aa30c864590b9d6

    methods: {
      ...mapActions({searchProducts: 'products/search'}),
      ...mapActions({updateProduct: 'products/update'}),
      next() {
        this.p++;
        this.searchProducts({...this.$route.query, p: this.p})
      },
      openDetails(product) {
        this.selectedProduct = product,
          this.$bvModal.show('modal-show')
      },
      hide() {
        this.$bvModal.hide('modal-show')
        this.$store.commit('products/toggleHide', this.currentProduct)
      },
    }

  }
</script>
<<<<<<< HEAD
=======

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
>>>>>>> 0e1ef1c95341fac1490ad0979aa30c864590b9d6
