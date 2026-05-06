const formCarrito = document.querySelector('#formCarrito');
const tipoProducto = document.querySelector('#tipoProducto');

const agregarProducto = (producto) => {
//console.log('entra');  
//console.log(tipoProducto.value);

localStorage.setItem('producto', producto)

console.log(agregarProducto)
};

  

formCarrito.addEventListener('submit', (ev) => {
  ev.preventDefault();
  agregarProducto(tipoProducto.value);
});
