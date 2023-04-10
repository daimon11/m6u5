const URL = `https://quickest-cubic-pyroraptor.glitch.me/api/goods`;

import renderAndCreate from './moduls/renderAndCreate.js';
import { deleteItemInTable } from './moduls/itemsControl.js';
import { changeProductRender, productsRender } from './moduls/httpRequest.js';

const {
  totalSumTable,
  showModal,
} = renderAndCreate;

const init = () => {
  const amountElements = document.querySelector('.crm__number-elements');
  amountElements.addEventListener('change', () => {
    productsRender(URL, amountElements.value);
  });

  const addProductBtn =
    document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const table = document.querySelector('.crm__table-body');
  const totalSumAllSpan = document.querySelector('.crm__bold-text');

  window.onload = productsRender(URL, amountElements.value);

  totalSumAllSpan.textContent = totalSumTable();

  addProductBtn.addEventListener('click', () => {
    showModal(null, {
      title: null,
      category: null,
      units: null,
      description: null,
      count: null,
      price: null,
      discount: null,
      image: null,
    },
      amountElements.value,
      'Добавить товар');
  });

  table.addEventListener('click', async ({ target }) => {
    if (target.closest('.correct-product')) {
      const id = target.closest('.crm__table-row').id;
      changeProductRender(`${URL}/${id}`, amountElements.value);
    }
  });
  deleteItemInTable(table, amountElements.value);

  const doneTyping = (event) => {
    console.log(event.target.value);
    productsRender(`https://quickest-cubic-pyroraptor.glitch.me/api/goods?search=${event.target.value}`, amountElements.value);
  };

  const debounce = (callback, delay) => {
    let typingTimer;

    return (...args) => {
      typingTimer && clearTimeout(typingTimer);
      typingTimer = setTimeout(() => callback(...args), delay);
    };
  };

  const debounceTyping = debounce(doneTyping, 300);

  document.querySelector('.crm__input-search').addEventListener('input', debounceTyping);

};

init();
