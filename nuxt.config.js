import pkg from './package'

export default {
  mode: 'universal',

  router: {
    linkActiveClass: 'is-active'
  },
  
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      class: 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
    },
    bodyAttrs: {
      class:  'pt-20 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
    } ,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: "180x180",  href: '/apple-touch-icon.ico' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/favicon-16x16.png' },
      { rel: 'manifest',  href: '/site.webmanifest' },
      { rel: 'canonical',  href: 'https://callemonte.com' }
    ],

  },


  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#28a745',
    height: '2px'
  },

  /*
  ** Global CSS
  */

  css: [
    '~/assets/css/main.scss'
    // { src: '~/assets/css/main.scss', lang: 'scss' },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false }
    // { src: '~/plugins/vue-gallery.js', ssr: false },
    // { src: '~/plugins/vue-social.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/pwa',
  ],

  /*
  ** Build configuration
  */
  build: {
    // analyze: true,

    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  buildModules: [
    // Simple usage
    '@nuxtjs/color-mode'
  ],    

  proxy: {
    // '/.netlify': 'http://localhost:9000' 
  }, 

  // pwa: {
  //   manifest: {
  //     name: 'Callemonte',
  //     lang: 'es'
  //   }
  // }

}
