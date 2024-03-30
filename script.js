const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

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
	} else {
		addItemToDOM(newItem);

		addItemToStorage(newItem);

		checkUI();
		itemInput.value = '';
	}
};

const removeItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
			checkUI();
		}
	}
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

	checkUI();
};

const checkUI = () => {
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearButton.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearButton.style.display = 'block';
		itemFilter.style.display = 'block';
	}
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
	itemList.addEventListener('click', removeItem);
	clearButton.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);

	checkUI();
};

init();
