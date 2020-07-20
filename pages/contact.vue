<template>
    <div class="pt-10">
          <div class="text-center mb-6">
            <img src="/logo.png" class="w-16 mx-auto">
            <h2 class="text-3xl font-bold">CALLEMONTE</h2>
            <h4 class="text-xl">Contacto</h4>
          </div>         
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              
            <p class="lead">Escríbeme si tienes alguna sugerencia, si encuentras algún error o solo para felicitarme por esta herramienta que el reconocimiento también me gusta. Te responderé en la mayor brevedad posible. </p>
            <form name="contact0" method="POST" action="/success" netlify-honeypot="bot-field" data-netlify="true" class="space-y-4">
              <p class="hidden">
                <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
              </p>            
              <div class="form-group">
                <label class="label">Correo Electrónico</label>
                <input class="block appearance-none w-full bg-white  dark:bg-gray-600 border border-gray-600 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" type="email" 
                  name="email" 
                  v-model="email" required>              
              </div>

              <div class="form-group">
                <label class="label">Mensaje</label>
                <textarea 
                  class="block appearance-none w-full bg-white  dark:bg-gray-600 border border-gray-600 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline" 
                  name="message" 
                  rows="5" 
                  v-model="msg"
                  required 
                  ></textarea>
              </div>

              <div class="control">
                <button class="bg-blue-600 hover:bg-blue-500 font-bold py-3 px-6 rounded focus:outline-none text-blue-100" >Enviar &rarr;</button>
              </div>
              
            </form>
            </div>
            
          </div>

    </div>
</template>

<script>
export default {
  layout: 'pages',  
  data(){
    return {
      prevPath: '',
      email: null,
      msg: null,
      errors: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevPath = from.fullPath
    })
  },
  methods: {
  }
}
</script>
