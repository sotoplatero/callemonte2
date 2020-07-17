<template>


<!--         <b-modal centered 
          hide-header 
          id="modal-show" 
          ref="modal-show" 
          :lazy="true"
          content-class="border-0"
          body-class="position-static p-0" 
          footer-class="p-2"
          @shown="open"> -->
        <cm-modal :showing="show" v-on:close="$emit('close')">
            <div v-if="currentProduct">

              <button type="button" class="btn back" aria-label="Close" @click.prevent="">
                x
              </button>

              <div class="card border-0" style="" >
                <div class="card-img-top aspect-ratio-box" v-if="product.photo">
                  <a href="#" class="aspect-ratio-box-inside">
                    <img :src="product.photo === true ? placeholderImage : product.photo" :alt="product.title" >
                  </a>
                </div>
                <div class="card-body p-3">
                  <div class="">
                    <div class="small text-secondary">
                      <span class="">{{product.location}}</span>
                      <span v-if="product.date">&bull;</span>
                      <span class="">{{product.date}}</span>
                    </div>
                    <div class="">
                      <a :href="product.url" target="_black" rel="noopener noreferrer">
                        <b>{{product.title}}</b>
                      </a>
                      <img :src="'/fav/'+product.site+'.png'" width="16" class="ml-2">
                    </div>
                    <div class="text-secondary">
                      $<b>{{product.price}}</b>
                      <a :href="'tel:' + phone" v-if="product.phones.length"  v-for="phone in product.phones">
                      {{ phone }}
                      </a>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
                <button class="btn btn-light text-uppercase ml-2" @click.prevent="hide">Eliminar</button>
                <a 
                  :href="'tel:' + product.phones[0]" 
                  v-if="product.phones && product.phones.length" 
                  class="btn btn-success">
                  <b>Llamar</b>
                </a>            
          
        </cm-modal>
            

<!--           <b-overlay :show="$store.state.products.updating" no-wrap rounded spinner-type="grow" spinner-variant="success">
          </b-overlay>
        </b-modal> -->
</template>

<script>
import { mapActions } from 'vuex'
import CmModal from './base/CMModal';

export default {
  components: { CmModal },
	props: [ 'currentProduct', 'showDetails' ],
	data(){
		return {
			loading: false,
			placeholderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII='
		}
	},
  mounted(){
    console.log(this.currentProduct)
  },
	computed: {
    show: function() {
      return this.showDetails;
    },
		product: function() {
			let url = this.currentProduct.url
			return this.$store.state.products.items.find( el => el.url === url )
		}
	},
	methods: {
	    ...mapActions({ updateProduct: 'products/update' }),
	    open(){
	    	console.log(this.currentProduct)
	    	if (this.currentProduct) {
		    	this.updateProduct(this.product)
	    	}
	    } , 		
		hide(){
			this.$bvModal.hide('modal-show')
			this.$store.commit('products/toggleHide',this.currentProduct)
		}
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