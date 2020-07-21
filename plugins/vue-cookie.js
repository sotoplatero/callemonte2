import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
export default function ({ app }, inject) {
  inject('cookie', VueCookie)
}