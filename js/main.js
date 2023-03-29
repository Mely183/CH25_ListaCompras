// El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";

});


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";  
    let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";
    //Con trim quitamos los espacios ---> Se cambio por el blur que esta abajo
    //txtNombre.value = txtNombre.value.trim();
    
    if(txtNombre.value.length == 0){
        txtNombre.style.border="solid thin red";
        lista += "<li>Se debe escribir un nombre válido</li>";
        // alertValidacionesTexto.innerHTML+="Se debe escribir una nombre válida";
        alertValidaciones.style.display="block";     
    }else{
        txtNombre.style.border ="";

    }

    if(txtNumber.value.length == 0){
        txtNumber.style.border="solid thin red";
        lista += "<li>Se debe escribir un número válido</li>";
        // alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad válida";
        alertValidaciones.style.display="block";  
    }else{
        txtNumber.style.border ="";
    }
    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);

}); //btnAgregar Click

txtNumber.addEventListener("blur",function(event){
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();

})
txtNombre.addEventListener("blur",function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();

})