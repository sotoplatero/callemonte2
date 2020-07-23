<template>
  <div class="z-50 ">
      <nav class="fixed w-full top-0 py-2 bg-gray-100 dark:bg-gray-900  shadow z-50"> 
        <div class="px-2 w-full max-w-3xl mx-auto ">
          <div class="w-full ">
              <div class="">
            <div class="relative flex flex-row justify-between h-16 text-xl">
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
                            v-model="q"
                            @keypress.enter.prevent="search" >
                    </div>
                </div>
                <div class="-mx-2 px-6 flex flex-row rounded-r-lg focus:outline-none focus:shadow-outline z-10 transition duration-150 text-color-700">

                    <button class="px-2" v-on:click="showFilters=true">
                      <svg class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150 hover:text-blue-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    </button>
                    <button 
                        v-on:click="$store.commit('favorites/toggleShow')" 
                        class="px-2"  
                        :class="$store.state.favorites.show ?  'text-yellow-500' : ''">
                        <svg class="h-6 w-6 inline" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>                     
                    </button>
                </div>
            </div>

              </div> 
          </div>
        </div>
      </nav>
      <Filters :show-filters="showFilters" @close="showFilters=false"/>
      <Menu :show-menu="showMenu" @close="showMenu=false"/>
  </div>
</template>
<script>
import Filters from './Filters';
import Menu from './Menu';

import Vue from 'vue'

export default {
  components: { Filters, Menu },
  // props: ['filters','products', 'page'],
  data(){
    return {
        showFilters: false,
        showMenu: false,
        q: '',
    }
  },
  mounted(){
    this.q = this.$route.query.q
  },
  methods: {
    search() {
      if ( this.q.length > 0 ) {
        this.$router.push({ 
          path: '/search', 
          query: { ...this.$route.query, q: this.q } 
        })
      } else {
        this.q = this.$route.query.q
        this.$bvModal.msgBoxOk('Escriba que quiere comprar',{
          size: 'sm',
          contentClass: 'text-center',
          footerClass: 'border-0 justify-content-center'
        })
      }
    },
        
  }    
};
</script>
