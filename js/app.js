//importaciones
import * as datos from './variables.js';

//eventos
(()=>{
    datos.formulario.addEventListener( "submit", validarForm );
})()


//funciones
function validarForm(e){
    e.preventDefault();
    //valor de los inputs
    const titulo = document.querySelector("#titulo").value;
    const artista = document.querySelector("#artista").value;
    const nosoyrobot = document.querySelector("#nosoyrobot").checked;
    
    //validando con un condicional
    if( !titulo.trim() || !artista.trim() || nosoyrobot === false ){
        mostrarMensaje("Complete el formulario", "danger");
        return
    }
        mostrarMensaje("buscando..", "success");
        setTimeout( ()=>{
            consultaAPI(titulo,artista,nosoyrobot);
        },1000 )
}


//funcion mostrar mensaje
function mostrarMensaje(mensaje, color){
    datos.mensaje.className = `mt-2 shadow border border-${color} rounded text-${color} text-center py-2`;
    datos.mensaje.textContent = mensaje;
    //borrar despues de 3 segundos
    setTimeout( () => {
        datos.mensaje.className = '';
        datos.mensaje.textContent = '';
    },1000 )
}


function consultaAPI(titulo,artista){
    const url = `https://api.lyrics.ovh/v1/${artista}/${titulo}`
    fetch(url)
    .then( respuesta => respuesta.json())
    .then( data => mostrarHTML(data,titulo, artista))
}

function mostrarHTML(data,titulo,artista){
    if(data.error){
        mostrarMensaje("cancion no encontrada..", "warning");
        return;
    }
    const {lyrics} = data
    datos.respuesta.innerHTML = `
    <h5 class="card-title">${titulo.toUpperCase()}</h5>
    <p class="card-text">${lyrics}</p>
    <p class="card-text fw-light">By: ${artista}</p>
    `

}