import Vue from 'vue'
var storejs = require('store/dist/store.modern');
require("string_score")

export const state = () => ({
  items: [],
  updating: [],
  searching: [],
  currentProduct: {},
  query: '',
  favorites: storejs.get('favorites') || 0,
})

export const mutations = {

  add( state, product ){
    state.items.push( product )
  },

  update(state, payload) {
    let product = {
        ...state.items[payload.index], 
        ...payload.product, 
        updated: true 
      }
    // state.items.splice(payload.index, 1, product)
    Vue.set(state.items, payload.index, product )
  },

  toggleHide( state, product ) { 
    product.hide = !product.hide 
  },  

  toggleFavorite( state, product ) {
    product.favorite = !product.favorite 
  },

  startUpdating( state, value ) { 
    state.updating.push( value )
  },

  stopUpdating( state, value ) { 
    const index = state.updating.indexOf(value);
    state.updating.splice(index, 1);    
  },

  startSearching( state, value ) { 
    state.searching.push(value)
  },

  stopSearching( state, value ) { 
    const index = state.searching.indexOf(value);
    state.searching.splice(index, 1);    
  },

  setQuery( state, value ) { 
    state.query = value
  },

  clear(state) { 
    state.items = [] 
  },
}

export const actions = {
  search ( { commit, state }, payload ) {
    const sites = [ 'bachecubano','revolico','porlalivre','timbirichi','1cuc','merolico' ];
    let { q, pmin = 1, pmax, p = 1, province='' } = payload
    let counter = 0

    if ( p === 1) {
      commit('clear')
    }
    pmin = pmin || 1;

    sites.forEach( site => {
      commit( 'startSearching', site )

      let url = `/.netlify/functions/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${p}&province=${province}`


      fetch(url)
        .then( response => response.json() )
        .then( response => { 
          let products = response.forEach( async (el,index) => { 
            // htmlTitle: el.title.replace( q, "<mark>$&</mark>" ),
            el.htmlTitle = el.title
            el.score = el.title.toLowerCase().score( q.toLowerCase() )
            el.hide = false
            el.favorite = false
            el.site = site

            if (!state.items.some( i => (i.site+i.price+i.title) === (el.site+el.price+el.title) )) {
              commit('add', el);
            }

          });
          commit('stopSearching',site)
        })
        .catch(e=>{
          commit('stopSearching',site)
        })

    })


  },

  async update( {commit, state}, product ) {
    if (!product.updated) {
      let url = `/.netlify/functions/details?url=${product.url}`

      let indexOfProduct = state.items
          .map( (_, i) => i )
          .find( e => state.items[e].url == product.url )

      commit( 'startUpdating', product.url )

      let response = await fetch(url).then( res => res.json() );

      commit('update', {
        index: indexOfProduct,
        product: { ...product, ...response } 
      });

      commit( 'stopUpdating', product.url );
    }

  }


}

export const getters = {
  filtered( state ) {
    return state.items
      .filter( el => !el.hide )
      // .sort( (a,b) => b.score - a.score || a.price - b.price )
  },

  current: state => url => state.items.find( el => el.url === url ),
  hides: state => state.items.filter( el => el.hide ),
  favorites: state => state.items.filter( el => el.favorite ),

  hidesCount(state) { 
    return [...state.items].filter( el => el.hide).length
  },
  productsCount(state) { 
    return state.items.length 
  }
}