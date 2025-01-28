const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const brandInput = document.getElementById('brand-input');
const idInput = document.getElementById('id-input');
const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');
const answerBody = document.getElementById('answer-body');
const deleteAllBtn = document.getElementById('delete-all-btn');

let products = [];
let editingProductId = null;

// Renderizar productos
function renderProducts() {
    answerBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('div');
        row.classList.add('flex', 'border-b', 'border-gray-300');
        row.innerHTML = `
            <div class="flex-1 px-4 py-2">${product.id}</div>
            <div class="flex-1 px-4 py-2">${product.name}</div>
            <div class="flex-1 px-4 py-2">${product.price}</div>
            <div class="flex-1 px-4 py-2">${product.brand}</div>
            <div class="flex-1 px-4 py-2">
                <button class="edit-btn bg-blue-500 text-white px-4 py-2 rounded mr-2" data-id="${product.id}">Edit</button>
                <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded" data-id="${product.id}">Remove</button>
            </div>
        `;

        answerBody.appendChild(row);

        row.querySelector('.edit-btn').addEventListener('click', handleEdit);
        row.querySelector('.delete-btn').addEventListener('click', handleDelete);
    });
}

// Agregar producto
function addProduct() {
    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const brand = brandInput.value.trim();

    if (!id || !name || !price || !brand || products.some(p => p.id === id)) {
        alert('Por favor, complete correctamente los campos o use un ID único.');
        return;
    }

    products.push({ id, name, price, brand });
    clearInputs();
    renderProducts();
}

// Manejar edición
function handleEdit(event) {
    const id = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === id);

    idInput.value = product.id;
    nameInput.value = product.name;
    priceInput.value = product.price;
    brandInput.value = product.brand;

    editingProductId = id;
    toggleButtons(true);
}

// Actualizar producto
function updateProduct() {
    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const brand = brandInput.value.trim();

    if (!id || !name || !price || !brand) {
        alert('Por favor, complete correctamente los campos.');
        return;
    }

    const index = products.findIndex(p => p.id === editingProductId);
    products[index] = { id, name, price, brand };

    clearInputs();
    toggleButtons(false);
    renderProducts();
}

// Eliminar producto
function handleDelete(event) {
    const id = parseInt(event.target.dataset.id);
    products = products.filter(p => p.id !== id);
    renderProducts();
}

// Cancelar edición
function cancelEdit() {
    clearInputs();
    toggleButtons(false);
}

// Eliminar todos los productos
function deleteAllProducts() {
    products = [];
    renderProducts();
}

// Limpiar inputs
function clearInputs() {
    idInput.value = '';
    nameInput.value = '';
    priceInput.value = '';
    brandInput.value = '';
}

// Alternar botones
function toggleButtons(editMode) {
    addBtn.classList.toggle('hidden', editMode);
    updateBtn.classList.toggle('hidden', !editMode);
    cancelBtn.classList.toggle('hidden', !editMode);
}

addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
cancelBtn.addEventListener('click', cancelEdit);
deleteAllBtn.addEventListener('click', deleteAllProducts);

renderProducts();
