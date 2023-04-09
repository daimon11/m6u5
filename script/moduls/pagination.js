import { createRow } from './renderAndCreate.js';

const postsEl = document.querySelector('.crm__table-body');
let currentPage = 1;

export const displayList = (arrData, rowPerPage) => {


  let page = currentPage - 1;

  if (page < 0) page = 0;
  if (currentPage < 1) currentPage = 1;

  postsEl.innerHTML = '';

  let start = rowPerPage * page;
  let end = start + rowPerPage;
  let paginatedData = arrData.slice(start, end);
  if (start >= arrData.length) {
    paginatedData = arrData;
  }
  console.log('paginatedData', paginatedData);
  postsEl.append(...paginatedData.map(item => createRow(item)));

  if (start > 0) start = start + 1;

  const paginationEl = document.querySelector('.crm__page-number');
  const pagesCount = Math.ceil(arrData.length / rowPerPage);
  paginationEl.textContent = `${start > 0 ? start : start + 1}-${end < arrData.length ? end : arrData.length} из ${arrData.length}`

  return pagesCount;
};

export const displayPaginationBtn = (page, arr, rows) => {
  const btnNext = document.querySelector('.next-page');
  const btnPrev = document.querySelector('.previous-page');
  btnNext.addEventListener('click', () => {
    currentPage += 1;
    if (currentPage > page) {
      currentPage = page;
    }
    displayList(arr, rows);
  });
  btnPrev.addEventListener('click', () => {
    currentPage -= 1;
    displayList(arr, rows);
  });
};

