let products = [
    {id: 1, name: "Carro 1:", price: 100000.99, image: "imagem/carro1.jpg"},
    {id: 2, name: "Carro 2:", price: 200000.99, image: "imagem/carro2.jpg"},
    {id: 3, name: "Carro 3:", price: 303000.99, image: "imagem/carro3.jpg"},
    {id: 4, name: "Carro 4:", price: 404500.99, image: "imagem/carro4.jpg"},
    {id: 5, name: "Carro 5:", price: 503000.99, image: "imagem/carro5.jpg"},
    {id: 6, name: "Carro 6:", price: 603455.99, image: "imagem/carro6.jpg"},
    {id: 7, name: "Carro 7:", price: 706000.99, image: "imagem/carro7.jpg"},
    {id: 8, name: "Carro 8:", price: 807000.99, image: "imagem/carro8.jpg"},
    {id: 9, name: "Carro 9:", price: 908000.99, image: "imagem/carro9.jpg"},
    //Pode se adicionar mais linhas
];

//filtrar produtos
function filterProducts(){
    let procurar = document.getElementById('searchInput').value.toLowerCase();

    let procurarProduto = products.filter(product =>
         product.name.toLowerCase().includes(procurar)
        );

    if(procurarProduto.length === 0){
        alert('nenhum produto encontrado!');
    }

    renderFilteredProducts(procurarProduto);
};

//exibe os produtos filtrados
function renderFilteredProducts(filteredProducts){
    let productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    filteredProducts.forEach((product) => {
        let productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button>Adicionar ao carrinho</button>
        `;

        productDiv.querySelector('button').addEventListener('click', () =>
            addToCart(product.id)
        );

    productGrid.appendChild(productDiv);
    });
};

let cart = [];

//busca os produtos 
function renderProducts(){
    let productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    products.forEach((product) => {
        let productDiv = document.createElement('div');
        productDiv.innerHTML = 
        //chama os elementos colocados dentro de products um por vez em um laço
        `
        <img src ="${product.image}" alt = "${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button>Adicionar ao carrinho</button>
        `;

        //adiciona função ao botão
        productDiv.querySelector('button').addEventListener('click', () => 
        addToCart(product.id));
        productGrid.appendChild(productDiv);

    });
};

//recebe o product ID
function addToCart(productId){
    //valida os dados
    let product = products.find((product) => product.id === productId);
    //puxa o produtc
    cart.push(product);
    renderCart();
};


function renderCart(){
    let cartTable = document.querySelector('.cart table tbody');
    cartTable.innerHTML = "";

    let cartCount = {};

    //verifica os produtos repetidos e soma eles ao invés de apresentar como se fosse um novo produto
    cart.forEach((product) => {
        if(cartCount[product.id]){
            cartCount[product.id].quantity += 1;
        }else{
            cartCount[product.id] = { ...product, quantity: 1 };
        }
    });


    Object.values(cartCount).forEach((product) => {
        let cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>R$ ${(product.price * product.quantity).toFixed(2)}</td>
        `;
        cartTable.appendChild(cartRow);
    });

    updateTotal();
};

function updateTotal(){
    let total = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
};

//encapsula para evitar erros
document.addEventListener('DOMContentLoaded', function () {
    //faz com que o botão de filtragem funcione
    document.getElementById('searchButton').addEventListener('click', filterProducts);
});


let currentProduct = 0;
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

document.getElementById('checkout').addEventListener('click', ()=> {
    //ve se o carrinho esta vazio, se sim avisa
        if (cart.length === 0){
            document.getElementById('checkout').addEventListener('click', function(){
                Swal.fire({
                    title: "Seu carrinho esta vazio!",
                    text: "Escolha algum produto da nossa loja!",
                    icon: "error",
                    confirmButtonText: "Fechar"
                });
           });
        }
        //Se estiver com itens dentro eçe mostra com o renderCart
        else{
            document.getElementById('checkout').addEventListener('click', function(){
                Swal.fire({
                    title: "Compra realizada com sucesso",
                    text: "Obrigado por comprar conosco",
                    icon: "success",
                    confirmButtonText: "Fechar"
                });
           });
            cart = [];
            renderCart();
        }
    });

//muda os slides para o carrosel
let indiceAtual = 0;
const slides = document.querySelectorAll('.slide');

function mostrarSlide(indice){
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
            if (i === indice){
                slide.classList.add("active");
            }
    });
}

function mudarSlide(direcao){
    indiceAtual += direcao;

    if (indiceAtual < 0){
        indiceAtual = slides.length - 1;
    } else if (indiceAtual >= slides.length){
        indiceAtual = 0;
    }

    mostrarSlide(indiceAtual);
}

setInterval(() => mudarSlide(1), 3000);
renderProducts();

