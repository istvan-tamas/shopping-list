const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const items = itemList.querySelectorAll('li');

const addItem = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;
	if (newItem === '') {
		alert('Please add an item');
		return;
	} else {
		const listItem = document.createElement('li');
		listItem.appendChild(document.createTextNode(newItem));
		const button = createButton('remove-item btn-link text-red');
		listItem.appendChild(button);
		itemList.appendChild(listItem);
		itemInput.value = '';
	}
};

const removeItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		e.target.parentElement.parentElement.remove();
	}
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
};

const checkUI = () => {
	if (items.length === 0) {
		clearButton.style.display = 'none';
		itemFilter.style.display = 'none';
	}
};

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);

checkUI();
