# Callemonte

Callemonte es un meta buscador de clasificados en Cuba.

Realiza las búsquedas en cada uno de los sitios, extrae los datos, consolida y los muestra y no usa base de datos. 

En el front utiliza [Svelte](//svelte.dev) con [Tailwind](//tailwindcss.com) y en el back las [funciones de Netlify](https://www.netlify.com/docs/functions/)

## Instalación 

Para el desarrollo local  debe instalar el [cliente de netlify](https://github.com/netlify/cli) 

```bash
npm install netlify-cli -g
```

Y...

```bash
git clone https://github.com/sotoplatero/callemonte
cd callemonte
yarn # or npm install
```

Para lanzar el proyecto

```bash
netlify dev # ntl dev
```

Si todo va bien debes tener a callemonte localmente en `http://localhost:8800` 