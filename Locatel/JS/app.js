const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "tarjeta_producto";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    ${product.enOferta ? `<del>$${(product.precio*((product.oferta/100)+1)).toFixed(0)}</del> $${product.precio}` : `<p>$${product.precio}</p>`}
    ${product.enOferta ? `<div class="descuento"><span class="descuento_label">Oferta ${product.oferta}%</span></div>` : ''}
    ${product.enReserva ? `<div class="reserva"><span class="reserva_label">Proximamente</span></div>` : ''}
    `;

  if (product.enOferta) {
    shopContentOferta.append(content);

  } else if (product.enReserva) {
    shopContentReserva.append(content);

  } else {
    shopContent.append(content);
  }

  let comprar = document.createElement("button");
  comprar.innerText = "Añadir al carro";
  comprar.className = "añadir_carrito";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    saveLocal();
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        oferta: product.oferta,
        cantidad: product.cantidad,
        enReserva: product.enReserva
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
  });
});
//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//get item
