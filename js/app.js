const contenedorPayCards = document.querySelector('#contenedorPayCards')
const contenedorPayButtons = document.querySelector('#contenedorPayButtons');
let total = 0; // variable para calcular el total
let cant = 0;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderPagoCarrito = () => {

    carrito.forEach((el) => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="row rounded paypage">
            <img class="img img-fluid col-sm-12 col-md-3 p-3" src="${el.img}" width=200 heigth=200 alt="Card image cap">
            <div class="col-md-3 paypage2">
                <div>
                    <h5 class="m-3 ">${el.nombreProd}</h5>
                    <p class="m-3 ">${el.descripcion}</p>
                    
                </div>
                <div class="" id="prodAlert" data-id="${el.id}"></div>
            </div>
            <div class="col-md-4 text-end">
                <h3 class="m-3 ">$${el.precio}</h3>
            </div>         
        </div>
        `
        total += el.precio // calculamos el total de los precios
        contenedorPayCards.append(card)

    })

    const btnPagar = document.createElement('div'); // boton de pago. 
    btnPagar.classList.add('text-end')
    btnPagar.innerHTML = `
    <div class="d-flex align-items-center justify-content-end paypage3">
          <h3 class="m-3">TOTAL: $${total}</h3>
          <div class="btn btn-info alertOk" >Pagar</div>
         
    </div>
    <div class="text-center" id="insertAlert"></div> `

    contenedorPayButtons.append(btnPagar);

}

const payEndApp = () => {
    let pagoOk = document.querySelector('.alertOk')
    pagoOk.addEventListener('click', (e) => {
        let insertAlert = document.querySelector('#insertAlert')
        insertAlert.innerHTML = `<div class="alert alert-success" role="alert">
        <strong> Gracias por comprar en Mining Store! </strong>
        </div>`
        contenedorPayCards.innerHTML = ""
        localStorage.setItem("carrito", null);
        carrito = [];
    })
}

renderPagoCarrito();
payEndApp();