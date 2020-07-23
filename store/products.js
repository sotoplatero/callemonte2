import Vue from 'vue'
require("string_score")

export const state = () => ({
  items: [],
  updating: [],
  searching: [],
  currentProduct: {},
  query: '',
})

export const mutations = {

  add( state, payload ){
    let product = { 
      ...payload, 
    }
    state.items.push( product )
  },

  update(state, product) {
    const index = [...state.items].map( el => el.url ).indexOf(product.url);

    let productUpdated = { ...product, updated: true }
    console.log(index)
    state.items.splice(index, 1, productUpdated)
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
    const sites = [ 'bachecubano','revolico','porlalivre','timbirichi','1cuc','merolico','hogarencuba' ];
    let { q, pmin = 1, pmax, p = 1, province='' } = payload
    let reQ = new RegExp(q.trim().replace(/\s+/g,'|'), "ig") 

    if ( p == 1) {
      commit('clear')
    }

    pmin = pmin || 1;

    sites.forEach( site => {
      commit( 'startSearching', site )

      let url = `/.netlify/functions/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${p}&province=${province}`


      fetch(url).then( res => res.json() )
        .then( response => { 
          response.forEach( async (el,index) => { 
            el.htmlTitle = el.title.replace( reQ, "<mark>$&</mark>" )
            el.score = el.title.toLowerCase().score( q.toLowerCase() )
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

      commit( 'startUpdating', product.url )

      try {
        let response = await fetch(url).then( res => res.json() );
        commit('update', {...product, ...response} );
      }
      catch(err) {}

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