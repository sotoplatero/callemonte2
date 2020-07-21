export const state = () => ({
  items: [],
})

export const mutations = {

  add( state, product ){
    state.items.push( product )
  },

  remove( state, product ) { 
    const index = state.updating.indexOf(product);
    state.items.splice(index, 1);    
  },

  clear(state) { 
    state.items = [] 
  },
}

export const actions = {
  toggle ( { commit, state }, product ) {
    let favorites = state.items;

    if ( favorites.find(el=>el===this.product) ) {
      const index = favorites.indexOf(this.product);
      commit('remove',product);
    } else {
      commit('add',product);
    }
  },


}

export const getters = {
  is: state => product => state.items.find( el => el === product ),
};
