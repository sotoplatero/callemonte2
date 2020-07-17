<template>
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
          <div class="space-x-4">
            <nuxt-link to="/about" class="btn btn-link text-secondary">Nosotros</nuxt-link>
            <nuxt-link to="/contact" class="btn btn-link text-secondary">Contacto</nuxt-link>
            <a href="https://medium.com/callemonte" target="_blank" class="btn btn-link text-secondary">Blog</a>
  <dark-mode-toggle
      id="dark-mode-toggle-1"
      legend="Theme Switcher"
      appearance="switch"
      dark="Dark"
      light="Light"
      remember="Remember this"
  >
              <svg class="h-6 w-6 inline" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>
    
  </dark-mode-toggle>            
          </div>                    
            
      </div>
  </section>
</template>

<script>
export default {
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

      let pmax = reMaxPrice.test(input) ? input.match(reMaxPrice)[1] : '';
      let pmin = reMinPrice.test(input) ? input.match(reMinPrice)[1] : '';    
      let q = input.replace(reMinPrice,'').replace(reMaxPrice,'').trim();   

      if ( this.input.length > 0 ) {
        this.$router.push({ path: '/search', query: { q: q, pmin: pmin, pmax: pmax } });
      }
    }            
  }  
}
</script>
