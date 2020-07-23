export const state = () => ({
  fields: {},
})

export const mutations = {

  update( state, query ){
    query.pmin = query.pmin || 1; 
    state.fields = query;
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

