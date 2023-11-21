const pintarCarrito = () => {
    saveLocal();
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      saveLocal();
      modalContainer.style.display = "none";
    
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((producto) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      let labelOferta = "";
      let labelReserva = "";
      let labelPrecio = `<p>${producto.precio} $</p>`

      if (producto.oferta > 0) {
        labelPrecio = `<del>$${(producto.precio*((producto.oferta/100)+1)).toFixed(0)}</del> $${producto.precio}`
      } 
      if (producto.oferta > 0) {
        labelOferta = '<span class="label_oferta">Oferta</span>';
      } 
      if (producto.enReserva) {
        labelReserva = '<span class="label_reserva">Reservado</span>';
      }
    
      carritoContent.innerHTML = `
        ${labelOferta}
        ${labelReserva}
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        ${labelPrecio}
        <span class="restar"> - </span>
        <p>${producto.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${(producto.cantidad * producto.precio)} $</p>
        <span class="eliminar"> ❌ </span>
      `;
  
      modalContainer.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (producto.cantidad !== 1) {
          producto.cantidad--;
        }                                                                                                                                                                                                                                                                                       
        saveLocal();
        pintarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        producto.cantidad++;
        saveLocal();
        pintarCarrito();
      });
  
      let elimprod = carritoContent.querySelector(".eliminar");
      elimprod.addEventListener("click", () => {
        eliminarProducto(producto.id);
      });
  
  
      // let eliminar = document.createElement("span");
      // eliminar.innerText = "❌";
      // eliminar.classList = "delete-producto";
      // carritoContent.append(eliminar);
      // eliminar.addEventListener("click", eliminarProducto);
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const botonpagar = document.createElement("h1")
    botonpagar.innerText = "Pagar";
    botonpagar.className = "modal-pay-button";
  
    botonpagar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("El carrito está vacío. ¿Qué desea comprar?");
      } else {
        const tieneReservas = carrito.some((producto) => producto.enReserva);
    
        if (tieneReservas) {
          const confirmacion = confirm("¿Desea confirmar las reservas realizadas, y realizar la compra?");
          
          if (confirmacion) {
            alert("¡Gracias por su compra!");
            modalContainer.style.display = "none";
            carrito = [];
            saveLocal();
            pintarCarrito();
          }else {
            alert("¿Qué desea hacer entonces?");
          }
        } else {
          alert("¡Gracias por su compra!");
          modalContainer.style.display = "none";
          carrito = [];
          saveLocal();
          pintarCarrito();
        }
      }
    });
  
    const totalBuying = document.createElement("div");
  
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
    modalContainer.append(botonpagar);
  
  };
  
  verCarrito.addEventListener("click", pintarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    console.log(foundId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
  
    saveLocal();
    pintarCarrito();
  };
  
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  carritoCounter();
  
  
  