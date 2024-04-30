const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

const displayItems = () => {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => {
		addItemToDOM(item);
	});
};

const onAddItemSubmit = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;
	if (newItem === '') {
		alert('Please add an item');
		return;
	}
	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');
		itemToEdit.classList.remove('edit-mode');
		itemToEdit.remove();
		removeItemFromStorage(itemToEdit);
		isEditMode = false;
	} else {
		if (checkIfItemExists(newItem)) {
			alert('Item already exists');
			return;
		}
	}
	addItemToDOM(newItem);

	addItemToStorage(newItem);

	checkUI();
	itemInput.value = '';
};

const setItemToEdit = (item) => {
	itemList.querySelectorAll('li').forEach((i) => {
		i.classList.remove('edit-mode');
	});
	isEditMode = true;
	item.classList.add('edit-mode');
	formBtn.innerHTML = '<i class="fa-solid fa-pen"> Edit item</i>';
	formBtn.style.backgroundColor = '#228B22';
	itemInput.value = item.textContent;
};

const onClickItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
	}
};

const checkIfItemExists = (item) => {
	const itemsFromStorage = getItemsFromStorage();
	return itemsFromStorage.includes(item);
};

const removeItem = (item) => {
	if (confirm('Are you sure?')) {
		item.remove();
		removeItemFromStorage(item.textContent);
		checkUI();
	}
};

const removeItemFromStorage = (item) => {
	let itemsFromStorage = getItemsFromStorage();

	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const addItemToDOM = (item) => {
	const listItem = document.createElement('li');
	listItem.appendChild(document.createTextNode(item));
	const button = createButton('remove-item btn-link text-red');
	listItem.appendChild(button);
	itemList.appendChild(listItem);
};

const createButton = (classes) => {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
};

const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

const clearItems = () => {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	localStorage.removeItem('items');
	checkUI();
};

const checkUI = () => {
	itemInput.value = '';

	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearButton.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearButton.style.display = 'block';
		itemFilter.style.display = 'block';
	}
	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
	formBtn.style.backgroundColor = '#333';

	isEditMode = false;
};

const filterItems = (e) => {
	const items = itemList.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();
		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
};

const addItemToStorage = (item) => {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.push(item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
	let itemsFromStorage;
	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}
	return itemsFromStorage;
};

const init = () => {
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onClickItem);
	clearButton.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);

	checkUI();
};

init();
