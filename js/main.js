 // El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = document.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

 let isValid = true;
 let idTimeout;
 let precio = 0;
 let contador = 0;
 let totalEnProductos = 0;
 let costoTotal = 0;

// Boton limpiar
 btnClear.addEventListener("click", function(event){
     event.preventDefault();
     txtNombre.value="";
     txtNumber.value="";
     cuerpoTabla[0].innerHTML="";

     contador = 0;
     totalEnProductos = 0;
     costoTotal = 0;
     contadorProductos.innerText="0";
     productosTotal.innerText="0";
     precioTotal.innerText = "$ 0";

    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal.toFixed(2));

 }); //click btnClear

 function validarCantidad(){
     if (txtNumber.value.length == 0){
         return false;
     } //if
     if(isNaN(txtNumber.value)){
         return false;
     }//if

     if(parseFloat(txtNumber.value) <= 0){
         return false;
     }//if

     return true;
 }//Validar cantidad función

 function getPrecio(){
     return Math.floor(Math.random() * 50 * 100) / 100;
   }//getPrecio  el .floor quita los decimales

 
 //Boton Agregar
  btnAgregar.addEventListener("click", function(event){
      event.preventDefault();
      isValid = true;
      console.log(getPrecio());
      clearTimeout(idTimeout);
      alertValidacionesTexto.innerHTML="";
      alertValidaciones.style.display="none";  
      let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";
      //Con trim quitamos los espacios ---> Se cambio por el blur que esta abajo
      //txtNombre.value = txtNombre.value.trim();
    
      if(txtNombre.value.length <2){
          txtNombre.style.border="solid thin red";
          lista += "<li>Se debe escribir un nombre válido</li>";
          // alertValidacionesTexto.innerHTML+="Se debe escribir una nombre válida";
          alertValidaciones.style.display="block";     
          isValid = false;
      }else{
          txtNombre.style.border ="";

      }

     if(!validarCantidad()){
         txtNumber.style.border="solid thin red";
         lista += "<li>Se debe escribir un número válido</li>";
         // alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad válida";
         alertValidaciones.style.display="block";  
         isValid = false;
     }else{
         txtNumber.style.border ="";
     }
     lista += "</ul>";
     alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);
     idTimeout = setTimeout (function() {
         alertValidaciones.style.display="none";
         }, 5000); //btnAgregar Click
     if(isValid){
         precio = getPrecio();
         contador++;
         let row = `<tr>
                     <th>${contador}</th>
                     <td>${txtNombre.value}</td>
                     <td>${txtNumber.value}</td>
                     <td>${precio}</td>
                     </tr>`;
         cuerpoTabla[0].insertAdjacentHTML("beforeend",row);
         contadorProductos.innerText=contador;
         totalEnProductos += parseFloat(txtNumber.value);
         productosTotal.innerText=totalEnProductos;
         costoTotal += precio * parseFloat(txtNumber.value);
         precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
         //Creamos un objeto en formato JSON en lugar de
         //manejar uno por uno con el localStorage.setItem
        let resume = `{"contadorProductos" : ${contador},
                       "totalEnProductos" : ${totalEnProductos}
                       "costoTotal" : ${costoTotal.toFixed(2)} }`;
        localStorage.setItem("resume", resume);
        //  localStorage.setItem("contadorProductos",contador);
        //  localStorage.setItem("totalEnProductos", totalEnProductos);
        //  localStorage.setItem("costoTotal",costoTotal);
         txtNombre.value = "";
         txtNumber.value = "";
         txtNombre.focus();
     }
 }); 
 txtNumber.addEventListener("blur",function(event){
     event.preventDefault();
     txtNumber.value = txtNumber.value.trim();

 })
 txtNombre.addEventListener("blur",function(event){
     event.preventDefault();
     txtNombre.value = txtNombre.value.trim();

 })


window.addEventListener("load", function(event){
    if(localStorage.getItem("contadorProductos")== null){
        localStorage.setItem("contadorProductos", "0");
    }
    if(localStorage.getItem("totalEnProductos") == null){
        localStorage.setItem("totalEnProductos", "0");
    }
    if(localStorage.getItem("costoTotal") == null){
        localStorage.setItem("costoTotal", "0.0");
    }
     contador = parseInt(localStorage.getItem("contadorProductos"));
     totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
     costoTotal = parseFloat(localStorage.getItem("costoTotal"));

     contadorProductos.innerText=contador;
     productosTotal.innerText = totalEnProductos;
     precioTotal.innerText = `$ ${costoTotal}`;
 });


