
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
const allDeleteBtn = document.querySelector('.all-delete-btn') // Boton que borra todas las pizzas en html

// 2- Traer elementos del LS si existen

let pizzas = JSON.parse(localStorage.getItem('pizzas')) || []

// 3- Grabar en LS

const saveLocalStorage = (pizzasList) => {  //Esto sirve para "guardar en LocalStorage"
    localStorage.setItem ('pizzas', JSON.stringify(pizzasList))  // Esto sirve para "guardar en LocalStorage"
}

// 4-  Crear y Renderizar las pizzas y errores Crear el elemento a renderizar 

const thisPizza = (pizzasLista) => 
` 
<li> <h2>${pizzasLista.nombre}</h2> <h3>${pizzasLista.precio}</h3>
    <img class="delete-btn" src= "./assets/Trash.png" alt="Botón para borrar las pizzas" data-id=${pizzasLista.pizzaId}>
</li>
`;

const renderPizzasList = renderPizzas => pizzasLists.innerHTML += renderPizzas.map(pizza => thisPizza(pizza)).join('')


const renderErrorNumber = () => {
    return `
    <li> <h2>Intenta colocar un número </h2>
    <img class="delete-btn" src= "./assets/Trash.png" alt="Botón para borrar las pizzas">
    </li>
    `
}

const crearRenderErrorNumber = () => pizzasLists.innerHTML += renderErrorNumber();

const renderErrorId = () => {
    return `
    <li> <h2>Ingresa un número de pizza valido</h2>
    <img class="delete-btn" src= "./assets/Trash.png" alt="Botón para borrar las pizzas">
    </li>
    `
}

const crearRenderErrorId = () => pizzasLists.innerHTML += renderErrorId();

// 6- Verificar si el boton delete all se muestra o no.

const hideDeleteAll = pizzasLists => {        
    if(!pizzasLists.length) {                      
        allDeleteBtn.classList.add('hidden');   
        return;                                 
    }
    allDeleteBtn.classList.remove('hidden'); 
}

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

    /* if (!idPizza.length){                              
        ` 
<li> <h2>${pizzas_variety.name}</h2> <h3>${pizzas_variety.precio}</h3>
    <img class="delete-btn" src= "./assets/Trash.png" alt="Botón para borrar las pizzas" data-id=${pizzas.pizzaId}>
</li>
`;      
        return                                          
    } else if (pizzas.some( pizza => pizza.name.toLowerCase() === idPizza.toLowerCase())) { //con .some revisamos si hay tareas de nombres iguales 
        alert(`¡Ups! Parece que ya tenes esa pizza en el mostrador`)                        //Si hay tareas con el mismo nombre, avisamos con alerta.
        return;                                                                                   
    }

    pizzas = [...pizzas, { name: idPizza, pizzaId: pizzas.length + 1 }];
    input.value = '';

    renderPizzasList(pizzas);       //Renderizo 
    saveLocalStorage(pizzas);     //Guardo en LS           
    hideDeleteAll(pizzas);        //Verifico    */        
}


//Lo siguiente que vamos a hacer es atrapar el id del punto 4 y hacer que suceda el evento de eliminar la tarea al tocar la imagen del "tachito" en lugar de tocar a todo el elemento.

const removePizza = eventremove => {   
    if(!eventremove.target.classList.contains('delete-btn'))
    return;                                                            

    const filterId = Number(eventremove.target.dataset.id);

     
    pizzas = pizzas.filter( pizzas => pizzas.pizzaId !== filterId)
    renderPizzasList(pizzas);
    saveLocalStorage(pizzas);
    hideDeleteAll(pizzas);
}

const removeAllPizzas = () => {
    pizzas = [];                     
    renderPizzasList(pizzas);                                          
    saveLocalStorage(pizzas);                                        
    hideDeleteAll(pizzas);                                           
}

// 9- Funciones para inicializar

const init = () => {
    //renderPizzasList(pizzas);
    saveLocalStorage(pizzas_variety)
    searchPizza.addEventListener('submit', showPizza);
    pizzasLists.addEventListener('click', removePizza);
    allDeleteBtn.addEventListener('click', removeAllPizzas);
    hideDeleteAll(pizzas);
}

 init()