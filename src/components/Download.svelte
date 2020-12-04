<script>
    export let products;

    function download() {
        let element = document.createElement('a'),
          d = new Date(),
          formatted_date = `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()} ${d.getHours()}H${d.getMinutes()}m`,
          filename = `callemonte.com ${formatted_date}.txt`,
          text = products
            .filter( p => p.phones.length )
            .map(p => `
                ${p.price}\t${p.title} ${p.province} ${p.date} \n\t
                ${p.description}\n\t
                ${p.phones}\n\t
            `)
            .join("\n\n\n\n\n");

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    
</script>
<button
    on:click|preventDefault="{download}"
    class="text-sm visited:text-purple-600 hover:text-blue-500" 
    title="Descargar PDF"
>

    <svg class="h-5 w-5 inline"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
</button>  