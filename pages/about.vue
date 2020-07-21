¸<template>
  <div class="py-10">
        <div class="text-center">
            <img src="/logo.png" class="w-16 mx-auto">
            <h2 class="text-3xl font-bold">CALLEMONTE</h2>
            <h3 class="text-2xl">Nosotros</h3>
        </div>

        <div class="mb-5">
          <p class="lead text-justify"><b>Callemonte.com</b> <i>(anteriormente unclic.pro)</i> es un buscador de anuncios de productos en sitios de Cuba: <a href="https://www.revolico.com" rel="nofollow" target="_blank"><i>Revolico</i></a>, <a href="https://www.bachecubano.com"  rel="nofollow" target="_blank"><i>Bachecubano</i></a>, <a href="https://1cuc.com" rel="nofollow" target="_blank"><i>1cuc</i></a>, <a href="https://www.timbirichi.com" rel="nofollow" target="_blank"><i>Timbirichi</i></a> y <a href="https://porlalivre.com" rel="nofollow" target="_blank"><i>Porlalivre</i></a>,  <a href="https://merolico.app" rel="nofollow" target="_blank"><i>Merolico</i></a>, <a href="https://https://www.hogarencuba.com/" rel="nofollow" target="_blank"><i>Hogarencuba</i></a> y seguiremos incrementando la lista. Si tienes algún sitio que agregar <a href="/contact"><i>contáctenos</i></a></p>
          <p class="lead">El objetivo de Callemonte es facilitar la búsqueda de lo que necesites comprar.</p>
          
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> 

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 class="font-bold">Cuida tus Datos.</h3> 
            <p class="lead text-justify">Ahorra tu paquete de datos utilizando solo la información necesaria.</p>
          </div>    

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 class="font-bold">Rápido.</h3> 
              <p class="lead text-justify">Pensado para que sea rápido solo se centra en encontrar lo que quieres comprar.</p>
          </div>
        </div>

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 class="font-bold">Limpia el texto.</h3> 
            <p class="lead text-justify">Elimina los caracteres extraños como <code>* ! _</code> y las palabras y frases que no dicen nada como <i>Vendooo</i> o <i>llame ya</i> que solo molestan.</p>
          </div>

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 class="font-bold">Anuncios con precio.</h3>
            <p class="lead text-justify"> Callemonte es un buscador de productos y todo producto a la venta debe tener un precio.</p>
          </div>
        </div>

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 class="font-bold">Sin Duplicados</h3>
            <p class="lead text-justify">Filtra los anuncios que están repetidos incluso si se repiten en varios sitios.</p>
          </div>

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 class="font-bold">Sin publicidad.</h3>
            <p class="lead text-justify">No se muestra ninguna publicidad, solo los anuncios de su interés.</p>
          </div>
        </div>

      </div>

          <div class="p-10 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 class="font-bold"><a href="https://github.com/sotoplatero/callemonte" target="_blank" >Código abierto</a></h3>
            <p class="lead text-justify">Si quieres mejorarlo PR el el github. Si quieres colaborar <a href="/contact" class="underline">contacta</a></p>
          </div>

        </div>

        <p class="italic mt-6">
          Callemonte está en desarrollo y puede que tenga algún problema, no dudes en <a href="/contact">escribirnos</a> para hacerlo mejor.
        </p>

  </div>

</template>

<script>
export default {
  layout: 'pages',
  data(){
    return {
      prevPath: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevPath = from.fullPath
    })
  },
}
</script> 
