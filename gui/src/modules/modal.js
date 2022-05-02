const closeModalBtn = document.querySelector('#close-modal-btn');
const openModalBtn = document.querySelector('#open-modal-btn');
const modalContainer = document.querySelector('.modal-container');


closeModalBtn.addEventListener('click', () => modalContainer.style.display = 'none');

openModalBtn.addEventListener('click', () => modalContainer.style.display = 'block')
