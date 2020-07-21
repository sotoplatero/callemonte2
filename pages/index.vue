<template>
<<<<<<< HEAD
  <section class="flex items-center h-screen m-0 bg-white dark:bg-gray-900 dark:text-gray-100">
      <div class="w-full text-center">
          <div class="w-full md:w-1/2 mx-auto">

            <img src="/logo.png" class="w-16 mx-auto">
            <h2 class="text-3xl font-bold">CALLEMONTE</h2>
            <h4 class="text-xl">Busca y encuentra lo que quieres comprar</h4>

            <div class="relative flex flex-row justify-between h-16 text-xl w-full md:w-3/4 mx-auto my-8">
                <div class="-mx-2 px-6 pr-2 flex flex-row items-center rounded-l-lg focus:outline-none z-10 pointer-events-none">
                    <div class="px-2">
                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-400 dark:text-gray-600 transition duration-150"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="absolute inset-0">
                    <div class="h-full rounded-lg dark:shadow-md transition duration-150">
                        <input 
                            type="text" 
                            class="w-full h-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg focus:outline-none shadow focus:shadow-outline transition duration-150" 
                            style="padding: 0px 4rem" 
                            placeholder="¿Qué quieres comprar?" 
                            autofocus                  
                            v-model="input"
                            @keypress.enter.prevent="search" >
                    </div>
                </div>

            </div>
                 
            
          </div>
          <Footbar />               
            
=======
  <section class="vertical-center m-0 bg-white">
    <div class="container ">
      <div class="row justify-content-center text-center">
        <div class="col-md-6">
          <div class="d-flex justify-content-center align-items-center">
              <span>
                <img src="/logo.png" width="40">
              </span>
            <h2 class="ml-2">CALLEMONTE</h2>
          </div>
          <h4 class="mb-5 mt-2">Buscador de clasificados en Cuba</h4>

          <div class="input-group mb-3">
            <!-- <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"> -->
            <input
              autofocus
              class="form-control form-control-lg"
              type="text"
              placeholder="¿Que quieres comprar?"
              name="input"
              v-model="input"
              @keyup.enter="search">
            <div class="input-group-append">
              <button class="btn btn-success" type="button" @click="search">
                <SearchIcon></SearchIcon>
              </button>
            </div>
          </div>

          <div class="form-group">
            <a href="https://notificon.com" class="btn btn-link text-dark" target="_blank"><b>Alertas</b></a>
            <nuxt-link to="/about" class="btn btn-link text-secondary">Nosotros</nuxt-link>
            <nuxt-link to="/contact" class="btn btn-link text-secondary">Contacto</nuxt-link>
            <a href="https://medium.com/callemonte" target="_blank" class="btn btn-link text-secondary">Blog</a>
          </div>

        </div>
>>>>>>> 0e1ef1c95341fac1490ad0979aa30c864590b9d6
      </div>

    </div>
  </section>
</template>

<script>
<<<<<<< HEAD
import Footbar from '~/components/Footbar';
export default {
  components: { Footbar },
  layout: 'home',
  data(){
    return {
      input: ''
    }
  },  
  methods: {
    search() {
      let reMaxPrice = /<\s*(\d+)/;
      let reMinPrice = />\s*(\d+)/;
      let input = this.input;
=======
  import {SearchIcon} from 'vue-feather-icons'
>>>>>>> 0e1ef1c95341fac1490ad0979aa30c864590b9d6

  export default {
    layout: 'home',
    components: {SearchIcon},
    data() {
      return {
        input: ''
      }
    },
    methods: {
      search() {
        let reMaxPrice = /<\s*(\d+)/;
        let reMinPrice = />\s*(\d+)/;
        let input = this.input;

        let pmax = reMaxPrice.test(input) ? input.match(reMaxPrice)[1] : '';
        let pmin = reMinPrice.test(input) ? input.match(reMinPrice)[1] : '';
        let q = input.replace(reMinPrice, '').replace(reMaxPrice, '').trim();

        if (this.input.length > 0) {
          this.$router.push({path: '/search', query: {q: q, pmin: pmin, pmax: pmax}});
        }
      }
    }
  }
</script>
