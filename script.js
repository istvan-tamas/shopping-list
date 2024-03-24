const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

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
		itemList.appendChild(listItem);
		itemInput.value = '';
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

itemForm.addEventListener('submit', addItem);