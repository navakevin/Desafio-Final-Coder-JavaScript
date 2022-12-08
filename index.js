//Query de elementos
const contenedorCard = document.querySelector('#contenedorCards');
const cartCount = document.querySelector('.cartCount');
const cartContainer = document.querySelector('.cartContainer');
const filterI = document.querySelectorAll('.filterI');
let carrito = []; // Nuestro MODAL DEL CARRITO
let listaProductos; // Array de productos.

fetch("./json/product.json") // funcion json para los prductos.
    .then((res) => res.json())

    .then((data) => {
        listaProductos = data;
        filterItems();

    });

//Funciones
const filterItems = () =>{ // agregamos filtro para renderizado por categorias.
    renderProductos();
    filterI.forEach((el)=>{
        el.addEventListener('click',(e)=>{
            let filterID = Number(el.getAttribute('data-id'))
            switch (filterID) {
                case 0: 
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break;
                case 1:
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break
                case 2:
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break
            }
        })
    })
}

const renderProductos = (filterID) => {
    if(filterID){
       let nuevoArr  = listaProductos.filter((el)=> el.categoria == filterID)
       nuevoArr.forEach((producto) => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-dark')
        card.style = 'width: 22rem';
        card.innerHTML = `
        <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${producto.nombreProd}</h5>
            <h3>$${producto.precio}</h3>
            <p class="card-text">${producto.descripcion}</p>
            <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
        </div>
        <div class="" id="prodAlert" data-id="${producto.id}"></div>
        `
        contenedorCard.append(card);
    })
    }else{
        listaProductos.forEach((producto) => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark')
            card.style = 'width: 22rem';
            card.innerHTML = `
            <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
            
            <div class="card-body">
                <h5 class="card-title">${producto.nombreProd}</h5>
                <h3>$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
            </div>
            <div class="" id="prodAlert" data-id="${producto.id}"></div>
            `
            contenedorCard.append(card);
        })
    }
    
    contenedorCard.classList.add('gap-3');
    agregarArrayCarrito(); // funcion click a "Agregar a Carrito"
}

const agregarArrayCarrito = () => {
    const cardSelector = document.querySelectorAll('.pcard')
    cardSelector.forEach((el) => {
        el.addEventListener('click', (e) => { // evento agregar al carrito.
            let productoAgregar = listaProductos.find(el => el.id == e.target.getAttribute("data-id"))
            carrito.push(productoAgregar);
            cartCount.innerText = carrito.length; // contador para el carrito. 
            alertAddProducto(e.target.getAttribute("data-id"));
            renderCarrito()
        })
    })
}

const alertAddProducto = () => {
    Swal.fire({
        title: 'Agregaste un producto a tu Carrito!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
    });
};
const renderCarrito = () => {
    cartContainer.innerHTML = "";
    
    carrito.forEach((pEncarro) => {

        const productoEnCarro = document.createElement('div');
        productoEnCarro.classList.add('productoCarro', 'p-3');
        productoEnCarro.innerHTML = `
        <div class="row rounded">
            <img class="col-sm-12 col-md-4" src="${pEncarro.img}" width="200" heigth="200" alt="Card image cap">
            <div class="p-3 col-12 col-xl-8">
                <div>
                    <h5 class="">${pEncarro.nombreProd}</h5>
                    <h3>$${pEncarro.precio}</h3>
                    <p class="">${pEncarro.descripcion}</p>
                </div>
                <div>
                <a class="btn btn-info elim "data-id=${pEncarro.id}>Eliminar del carro</a>
                </div>
            </div>
        </div>
        `
        cartContainer.append(productoEnCarro)

    })

    eliminarProductoDelCarro();//
    localStorage.setItem('carrito',JSON.stringify(carrito));
}



const eliminarProductoDelCarro = () => { //eliminar productos del carrito
    const cardCartContainer = document.querySelectorAll('.elim')
    cardCartContainer.forEach((el) => {
        el.addEventListener('click', (e) => {
            let productoQuitar = carrito.find(el => el.id == e.target.getAttribute("data-id"))
            let indice = carrito.indexOf(productoQuitar)
            carrito.splice(indice, 1);
            cartCount.innerText = carrito.length;
            renderCarrito()
        })
    })
}

JSON.parse(localStorage.getItem('carrito')) && JSON.parse(localStorage.getItem('carrito')).forEach((el)=>{  // Actualizamos el carrito con los datos de Local Storage para no perder la informacion.
    carrito.push(el)
    cartCount.innerText = carrito.length;
    renderCarrito()
})


//Ejecuciones
 filterItems(); // Funcion encargada de ejecutar todo el procedimiento 
