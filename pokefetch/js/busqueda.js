function esId(n) {
    return /^\d+$/.test(n);
};
function mayus(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
}
function traducir(names){
    return names.find(obj=>obj.language.name=="es") || names.find(obj=>obj.language.name=="en");
}
function procesar(respuesta){
    if (respuesta.ok) return respuesta.json()
    else console.error("POKEerror en POKErespuesta = "+respuesta.status+" "+respuesta.statusText);
}

async function buscar(){
    let consulta = document.getElementById("texto").value
    let id = esId(consulta)
    if (!id && !isNaN(+consulta)){
        console.error("ID no valida")
        return
    }
    document.getElementById('estado').innerHTML = 'Buscando Pokemon con '+(id?'Id':'Nombre')+': <span class="resaltar">'+consulta+'</span>'
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/"+consulta.toLowerCase()).then(procesar).catch(console.error);
    document.getElementById("poketitulo").innerHTML = mayus(pokemon.name)+" #"+pokemon.id;
    fetch(pokemon.species.url)
    .then(procesar)
    .then(especie => {
        for (let e of document.getElementsByTagName("th"))
            e.style.backgroundColor = especie.color.name;
        return Promise.all(pokemon.types.map(k=>fetch(k.type.url)));
    })
    .then(respuestas => Promise.all(respuestas.map(procesar))) //NO SE PUEDE HACER EN EL MAP??? ()
    .then(tipos => {
        for (let i in tipos){
            document.getElementById("poketipo").innerHTML = (i==0?"":document.getElementById("poketipo").innerHTML+", ")+traducir(tipos[i].names).name;            
        }
        return
    })
    .then(async () => {
        for (let i in pokemon.moves){
            let pokemov = '<span class="error">ERROR</span>';
            await fetch(pokemon.moves[i].move.url).then(procesar).then(movimiento => {
                pokemov = traducir(movimiento.names).name
            }).catch(console.error);
            document.getElementById("pokemov").innerHTML = (i==0?"":document.getElementById("pokemov").innerHTML+", ")+pokemov;
        }
    })
    .catch(err => {
        console.error("POKError = "+err)
    });
};

document.getElementById("boton").addEventListener("click", buscar)
document.getElementById("formulario").addEventListener("submit", buscar)