
// 1- Definir las variables

const pizzas_variety = [
    {
        nombre: "Super Muzarella",
        id: 1,
        ingredientes: [`queso muzzarella`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 850,
    },
    {
        nombre: "Super Primavera",
        id: 2,
        ingredientes: [`queso muzzarella`,`jamón`, `tomate`, `huevo`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    
    },
    {
        nombre: "Super Americana",
        id: 3,
        ingredientes: [`queso cheddar`,`bacon`,`huevo frito`, `salsa barbacoa`],
        aceitunas: false,
        precio: 1000,
    },
    {
        nombre: "Super Rúcula",
        id: 4,
        ingredientes: [`queso muzzarella`,`rúcula`, `aceite de oliva`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    },
    {
        nombre: "Super Morrón",
        id: 5,
        ingredientes: [`queso muzzarella`,`morrón rojo`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    },
    {
        nombre: "Super Cuatro Quesos",
        id: 6,
        ingredientes: [`queso muzzarella`,`queso gorgonzola`, `queso fontina`, `queso parmesano`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    },
    {
        nombre: "Super Napolitana",
        id: 7,
        ingredientes: [`queso muzzarella`,`tomate`, `huevo duro trozado`, `salsa de tomate con orégano`],
        aceitunas: false,
        precio: 1000,
    },
    {
        nombre: "Super Especial",
        id: 8,
        ingredientes: [`queso muzzarella`,`jamón`, `huevo duro trozado`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    },
    {
        nombre: "Super Palmitos",
        id: 9,
        ingredientes: [`queso muzzarella`,`palmitos`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    },
    {
        nombre: "Super Ananá",
        id: 10,
        ingredientes: [`queso muzzarella`,`ananá`, `salsa de tomate con orégano`],
        aceitunas: true,
        precio: 1000,
    }
];

const input = document.querySelector('.input-number-pizza') // Input number de HTML
const searchPizza = document.querySelector('.search-pizza') // form en html
const pizzasLists = document.querySelector('.pizzas-lists') // listas renderizadas

// 2- Traer elementos del LS si existen

let pizzas = JSON.parse(localStorage.getItem('pizzas')) || []

// 3- Grabar en LS

const saveLocalStorage = (pizzasList) => {  //Esto sirve para "guardar en LocalStorage"
    localStorage.setItem ('pizzas', JSON.stringify(pizzasList))  // Esto sirve para "guardar en LocalStorage"
}

// 4-  Crear y Renderizar las pizzas y errores Crear el elemento a renderizar 

const thisPizza = (pizzasLista) => 
` 
<li> <h2>${pizzasLista.nombre}</h2> <h3>$${pizzasLista.precio}</h3 data-id=${pizzasLista.pizzaId}>
</li>
`;

const renderPizzasList = renderPizzas => pizzasLists.innerHTML += renderPizzas.map(pizza => thisPizza(pizza)).join('')


const renderErrorNumber = () => {
    return `
    <li class="li-error" style="border: solid red;"> <h2>Aún no tenemos esa pizza</h2>
    </li>
    `
}

const crearRenderErrorNumber = () => pizzasLists.innerHTML += renderErrorNumber();

const renderErrorId = () => {
    return `
    <li class="li-error" style="border: solid red;"> <h2>Coloca un número del 1 al 10</h2>
    </li>
    `
}

const crearRenderErrorId = () => pizzasLists.innerHTML += renderErrorId();

// 7- Formulario para agregar tareas

const showPizza = event => {
    event.preventDefault();                     

    const idPizza = input.value;        
    let pizzaEncontrada = pizzas_variety.filter(pizza => pizza.id == idPizza);
    if(pizzaEncontrada[0] != undefined) {
        renderPizzasList(pizzaEncontrada)
    } else if (idPizza) {
        crearRenderErrorNumber()
    } else {
        crearRenderErrorId()
    }       
}

const init = () => {
    saveLocalStorage(pizzas_variety)
    searchPizza.addEventListener('submit', showPizza);
    pizzasLists.addEventListener('click', removePizza);
    hideDeleteAll(pizzas);
}
 init()