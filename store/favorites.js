export const state = () => ({
  items: [],
  show: false,
})

export const mutations = {

  add( state, product ){
    state.items.push( product )
  },

  remove( state, product ) { 
    const index = state.items.map( el => el.url ).indexOf(product.url);
    state.items.splice(index, 1);    
  },

  clear(state) { 
    state.items = [] 
  },

  toggleShow( state, value ) {
    state.show = !state.show 
  },  

}

export const actions = {
  toggle ( { commit, state }, product ) {
    let favorites = state.items;

    if ( favorites.find(el=>el.url===product.url) ) {
      const index = favorites.indexOf(product.url);
      commit('remove',product);
    } else {
      commit('add',product);
    }
  },


}

export const getters = {
  is: state => product => state.items.find( el => el === product ),
};
