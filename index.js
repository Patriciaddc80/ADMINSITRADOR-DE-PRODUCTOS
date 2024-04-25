// elementos del DOM con variables globales para obtener todos los inputs y los botones de actualizacion y eliminar

const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const brandInput = document.getElementById('brand-input');
const idInput = document.getElementById('id-input');
const addBtn = document.getElementById('add-btn');
const answerBody = document.getElementById('answer-body');
const updateContainer = document.getElementById('update-container');
const updateId = document.getElementById('update-id'); // 
const updateNameInput = document.getElementById('update-name-input');
const updatePriceInput = document.getElementById('update-price-input');
const updateBrandInput = document.getElementById('update-brand-input');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');

let products = []; // aqui el array para almacenar los productos

// -------------------------------------------------Función 1  para renderizar la lista de productos----------------------------------
function renderProducts() {
    answerBody.innerHTML = ''; // Limpiar el campo de la respuesta al crear la lista
    products.forEach(product => {
        const row = document.createElement('div'); // Crear un elemento div para cada producto
        row.classList.add('flex', 'border-b', 'border-gray-300'); // Añadir clases CSS al elemento div
        row.innerHTML = `
            <div class="flex-1 px-4 py-2">${product.id}</div> //id de los productos
            <div class="flex-1 px-4 py-2">${product.name}</div> //nombre
            <div class="flex-1 px-4 py-2">${product.price}</div> //precio
            <div class="flex-1 px-4 py-2">${product.brand}</div> //marca
            <div class="flex-1 px-4 py-2">
                <button class="edit-btn bg-blue-500 text-white px-4 py-2 rounded mr-2" data-id="${product.id}">Editar</button>
                <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded" data-id="${product.id}">Eliminar</button>
            </div>
        `;

        //------------------------------------Funcion 2---------------- Agregar contenido HTML al elemento div------------------------


        answerBody.appendChild(row); // Agregar el elemento div a la caja de la repuesta

        // ---------------------------------aqui añado los eventos a los botones de editar y eliminar-----------------------------

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(btn => {
            btn.addEventListener('click', handleEdit);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', handleDelete); // Evento de clic para eliminar los pproductos
        });
    });
}

// --------------------------------------Función 3------------------- para agregar un producto---------------------------------------


function addProduct() {
    const id = parseInt(idInput.value); // 
    const name = nameInput.value.trim(); // Obtener el nombre del campo de entrada y  function TRIM para eliminar los espacios en blanco
    const price = parseFloat(priceInput.value.trim()); //convertir en cadena con parseFloat
    const brand = brandInput.value.trim();

    // Validar los campos de entrada
    if (isNaN(id) || id <= 0 || name === '' || isNaN(price) || price <= 0 || brand === '') {
        alert('Por favor, complete los campos correctamente.'); // Mostrar alerta si los campos no están completos o son inválidos
        return;
    }

    // Verificar si ya existe un producto con el mismo ID

    if (products.some(product => product.id === id)) {
        alert('Ya existe un producto con ese ID.'); // Mostrar alerta si ya existe un producto con el mismo ID
        return;
    }

    const newProduct = { id, name, price, brand }; // Crear un nuevo objeto de producto
    products.push(newProduct); // Agregar el nuevo producto al array de productos

    renderProducts(); // Renderizar los productos actualizados en la interfaz

    // Limpiar los campos de entrada después de agregar el producto
    idInput.value = '';
    nameInput.value = '';
    priceInput.value = '';
    brandInput.value = '';
}

// ----------------------------------------Función 4 ---------------para manejar la edición de un producto--------------------------
function handleEdit(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);

    updateId.value = product.id;
    updateNameInput.value = product.name;
    updatePriceInput.value = product.price;
    updateBrandInput.value = product.brand;

    // Establecer el atributo dataset.productId en updateId
    updateId.dataset.productId = product.id;

    updateContainer.classList.remove('hidden');
}


// ------------------------------------------ Función 5 ---------------------- para actualizar un producto
function updateProduct() {
    const oldId = parseInt(updateId.dataset.productId);
    const newId = parseInt(updateId.value);
    const name = updateNameInput.value.trim();
    const price = parseFloat(updatePriceInput.value.trim()); // Obtener el precio del campo de entrada y eliminar espacios en blanco
    const brand = updateBrandInput.value.trim(); //trim para eliminar espacios en blanco

    // Validar los campos de entrada
    if (isNaN(newId) || newId <= 0 || name === '' || isNaN(price) || price <= 0 || brand === '') {
        alert('Por favor, complete los campos correctamente.'); // Mostrar alerta si los campos no están completos o son inválidos
        return;
    }

    // Verificar si el nuevo ID ya está en uso por otro producto
    if (newId !== oldId && products.some(product => product.id === newId)) {
        alert('Ya existe un producto con ese ID.'); // Mostrar alerta si el nuevo ID ya está en uso
        return;
    }

    const index = products.findIndex(p => p.id === oldId); // Encontrar el índice del producto
    products[index] = { id: newId, name, price, brand }; // Actualizar 

    renderProducts(); // Renderizar los productos actualizados 

    // Limpiar los campos de entrada del formulario de edición
    //limpia el campo de entrada updateBrandInput al asignarle una cadena vacía.
    updateId.value = '';
    updateNameInput.value = '';
    updatePriceInput.value = '';
    updateBrandInput.value = '';

    updateContainer.classList.add('hidden'); // Ocultar el contenedor de actualización
}

// --------------------------------------Función 6 -------------------------para manejar la eliminación de un producto
function handleDelete(event) {
    const productId = parseInt(event.target.dataset.id); // Obtener el ID del producto a eliminar
    products = products.filter(p => p.id !== productId); // Filtrar el array
    renderProducts(); // Renderizar los productos actualizados en la interfaz
}

// -------------------------------Función 7 ----------------------------para cancelar la edición
function cancelEdit() {
    // Limpiar los campos de entrada del formulario de edición
    updateId.value = '';
    updateNameInput.value = '';
    updatePriceInput.value = '';
    updateBrandInput.value = '';

    updateContainer.classList.add('hidden'); // Ocultar el contenedor de actualización
}

// Event listeners
addBtn.addEventListener('click', addProduct); //  agregar
updateBtn.addEventListener('click', updateProduct); //  actualización
cancelBtn.addEventListener('click', cancelEdit); // botón de cancelar

// Renderizar productos inicialmente
renderProducts();

// Función para mostrar los detalles del producto
function mostrarDetallesProducto(producto) {
    const answerBody = document.getElementById("answer-body");
    let detallesHTML = "";

    detallesHTML += "<div class='flex'>";
    detallesHTML += "<div class='flex-1 px-4 py-2'>" + producto.id + "</div>";
    detallesHTML += "<div class='flex-1 px-4 py-2'>" + producto.nombre + "</div>";
    detallesHTML += "<div class='flex-1 px-4 py-2'>" + producto.precio + "</div>";
    detallesHTML += "<div class='flex-1 px-4 py-2'>" + producto.marca + "</div>"; // Modificado
    // Aquí puedes agregar más detalles del producto según sea necesario
    detallesHTML += "</div>";

    answerBody.innerHTML = detallesHTML;
}

// window para llamar a la función para mostrar los detalles del producto al cargar la página
window.onload = function () {
    // Simulación de un objeto de producto para mostrar los detalles
    const producto = {
        id: '',
        nombre: '',
        precio: '',
        marca: '',
    };

    mostrarDetallesProducto(producto); // Se pasa el objeto producto como argumento
};
