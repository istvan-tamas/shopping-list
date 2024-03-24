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
		console.log('success');
	}
};

itemForm.addEventListener('submit', addItem);
