
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

saveLocalStorage(pizzas_variety)

// 4- Crear el elemento a renderizar 

const thisPizza = (pizzasLista) => 
` 
<li> <h2>${pizzasLista.nombre}</h2> <h3>${pizzasLista.precio}</h3>
    <img class="delete-btn" src= "./assets/Trash.png" alt="Botón para borrar las pizzas" data-id=${pizzasLista.pizzaId}>
</li>
`;

// 5- Renderizar la o las pizzas

const renderPizzasList = renderPizzas => {                                 
    pizzasLists.innerHTML = renderPizzas.map(pizza => thisPizza(pizza)).join('')
}

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
    event.preventDefault();                     //Con el preventDefault evitamos que la pagina se recargue cada vez que hagamos "SUBMIT"

    const idPizza = input.value.trim();        //con .trim le sacamos los espacios del inicio y del final si es que hubieran

    if (!idPizza.length){                              
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
    hideDeleteAll(pizzas);        //Verifico           
}

//Vamos a usar la variable del punto 2, "tasks" va a ser la variable que nos va a permitir a nosotros saber que renderizar, cuando renderizarlo y que es lo que vamos a hacer. Todo va a pasar por "tasks". Tasks era un array de objetos que vamos a utilizar para renderizar.
//Colocar "...tasks" es mantener todas las tareas que teniamos y le agrego un objeto nuevo con name: taskName, taskId: tasks.length + 1
//Colocar tasks.length + 1 hacemos que sea las tareas siempre sean incrementales.
//Luego de tener el objeto nuevo creado y tener el preventDefault con el submit evitando que se reinicie la pagina vamos a obligar al input colocando "input.vale = ''" (Colocamos un string vacio) a que se reinicien los input anteriores.
//con renderTaskList(tasks); Renderizamos renderTaskList - Del punto 5 - y le pasamos las tasks (todas las tareas que tengamos)
//con saveLocalStorage(tasks); Guardamos en Local Storage a las tasks
//con hideDeleteAll(tasks); Verifico si hay tareas o no para que aparezca el boton.


//Lo siguiente que vamos a hacer es atrapar el id del punto 4 y hacer que suceda el evento de eliminar la tarea al tocar la imagen del "tachito" en lugar de tocar a todo el elemento.

const removePizza = eventremove => {   
    if(!eventremove.target.classList.contains('delete-btn'))       //Si hago click en otro lugar que no sea la img del "tachito" no hace nada
    return;                                                            // Si contiene la imagen del tachico, borra.

    const filterId = Number(eventremove.target.dataset.id);         //Accedemos al numero que el sistema me lo brinda como string sobre el ID

    //Si queremos borrar un elemento de tasklists... 
    pizzas = pizzas.filter( pizzas => pizzas.pizzaId !== filterId)  // Hace que borremos la tarea individual que queramos en base a su unico ID
    renderPizzasList(pizzas);
    saveLocalStorage(pizzas);
    hideDeleteAll(pizzas);
}

//IMPORTANTE Al lado de .Contains debe ir la clase del buton (Del LI que se agrega desde JS)

// 8- Funcionamiento del Boton para Remover todas.

const removeAllPizzas = () => {
    pizzas = [];                     //Vaciamos los arrays de objetos construidos anteriormente al final del punto 7
    renderPizzasList(pizzas);                                          // Renderizamos un array vacio
    saveLocalStorage(pizzas);                                        // Guardo un array vacio (no guardamos nada en LS)
    hideDeleteAll(pizzas);                                           // Verifico si corresponde el boton de "eliminar tareas" o no.
}

// 9- Funciones para inicializar

const init = () => {
    renderPizzasList(pizzas);
    searchPizza.addEventListener('submit', showPizza);
    pizzasLists.addEventListener('click', removePizza);
    allDeleteBtn.addEventListener('click', removeAllPizzas);
    hideDeleteAll(pizzas);
}

 init()