const formCarrito = document.querySelector('#formCarrito');
const tipoProducto = document.querySelector('#tipoProducto');
const tablaProductos = document.querySelector('#tablaProductos>tbody');
/**
 * Recogemos el valor de arrayProductos del localStorage,
 * si es null le asignamos array vacío con || [].
 * @type {Array}
 */
const arrayProductos = JSON.parse(localStorage.getItem("arrayProductos")) || [];
const fragmento = document.createDocumentFragment();



formCarrito.addEventListener('submit', (ev) => {
  //para prevenir que al clickar en submit los datos se manden directamente
  ev.preventDefault();

  const botonPulsado = ev.submitter;

  switch (botonPulsado.id) {
    case "botonAniadir":
      agregarProducto(tipoProducto.value); 
      break;
    case "botonQuitar":
      restarProducto(tipoProducto.value);
      break;
    default: 
      console.log("botón pulsado desconocido")
  } 

  /*
    tipoProducto es un String. Hacemos referencia al producto elegido por el usuario y lo añadimos.
    (establece el valor de la opcion seleccionada)
  */
  
});








const agregarProducto = productoElegido => {
  /*
    definimos el producto que cumplira la siguinete condición.
    En este caso, buscaremos en el array de los productos,
    el producto que cumpla la condición ----> (siguiente comentario)
  */
  const productoEncontrado = arrayProductos.find(producto => { 
    //el nombre del producto en la web y el producto elegido por el usuario coinciden 
    return producto.nombre === productoElegido 
  })

  if (typeof productoEncontrado === "undefined" )  { 
    //creamos el objeto con el producto nuevo.
    const productoNuevo = { nombre: productoElegido, cantidad: 1}
    //lo añadimos al final del array de los productos
    arrayProductos.push(productoNuevo);
  } else {
    productoEncontrado.cantidad += 1;
  }

  // almacenamos el valor de arrayProductos
  
  localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));



    
//console.log('entra');  
//console.log(tipoProducto.value);


};

const restarProducto = productoElegido => {

  const productoEncontrado = arrayProductos.find(producto => { 
    //el nombre del producto en la web y el producto elegido por el usuario coinciden 
    return producto.nombre === productoElegido 
  })

  if(typeof productoEncontrado === "undefined" )  {
    return
  }

  if (productoEncontrado.cantidad === 1) {
    arrayProductos.splice(arrayProductos.indexOf(productoEncontrado), 1);

    
  }else {

    productoEncontrado.cantidad -= 1;
  }

  if(arrayProductos.length === 0) {
    localStorage.removeItem("arrayProductos")
  }else{

  localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

  }



}

  

const crearTabla = () => {
  arrayProductos.forEach(({nombre, cantidad}) => {
    const tr = document.createElement('tr');
    const tdNombre = document.createElement('td');
    const tdCantidad = document.createElement('td');
    const tdQuitar = document.createElement('td');
    const botonQuitar = document.createElement('button');

    tr.id = nombre;
    tr.append(tdNombre, tdCantidad, tdQuitar);
    tdNombre.textContent = nombre;
    tdCantidad.textContent = cantidad;
    tdQuitar.append(botonQuitar);
    botonQuitar.textContent = '-';

    fragmento.append(tr);
  });

  tablaProductos.append(fragmento);
};




crearTabla();
