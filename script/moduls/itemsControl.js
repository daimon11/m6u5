import { httpRequest, httpRequestDel, productsRender } from './httpRequest.js';
import { totalSumTable } from './renderAndCreate.js';

const dataProcessing = (url, method, contact, elements, rows) => {
  console.log('dataProcessing rows', rows);
  httpRequest(url, {
    method: `${method}`,
    body: {
      'title': `${contact.title}`,
      'price': +`${contact.price}`,
      'description': `${contact.description}`,
      'category': `${contact.category}`,
      'discount': `${contact.discount}`,
      'count': +`${contact.count}`,
      'units': `${contact.units}`,
      'image': `${contact.image}`,
    },
    callback(err, data) {
      if (err) {
        const btnClose = elements.error.querySelector('.error__close-btn');
        console.warn(err, data);
        elements.error.classList.remove('visually-hidden');
        btnClose.addEventListener('click', () => {
          elements.error.classList.add('visually-hidden');
        });
      } else {
        elements.formModal.reset();
        elements.span.textContent = 0;
        elements.modalWindow.remove();
        document.querySelector('.crm__bold-text').textContent = totalSumTable();
        productsRender(`https://quickest-cubic-pyroraptor.glitch.me/api/goods`, rows);
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const addContactProducts = (
  id,
  {
    title,
    price,
    description,
    category,
    discount = 0,
    count,
    units,
    image,
  },
  modal,
  modalError,
  form,
  finishSumProductSpan,
  rows,
) => {
  console.log('addContactProducts', image);
  console.log('addContactProducts rows', rows);
  const contact = {
    'title': `${title}`,
    'price': +`${price}`,
    'description': `${description}`,
    'category': `${category}`,
    'discount': `${discount}`,
    'count': +`${count}`,
    'units': `${units}`,
    'image': `${image}`,
  };

  if (contact.image === 'undefined' || contact.image === 'data:') {
    delete contact.image;
  }


  if (id) {
    dataProcessing(
      `https://quickest-cubic-pyroraptor.glitch.me/api/goods/${id}`,
      'PATCH',
      contact,
      {
        'error': modalError,
        'formModal': form,
        'span': finishSumProductSpan,
        'modalWindow': modal,
      },
      rows,
    );
  } else {
    dataProcessing(
      `https://quickest-cubic-pyroraptor.glitch.me/api/goods`,
      'POST',
      contact,
      {
        'error': modalError,
        'formModal': form,
        'span': finishSumProductSpan,
        'modalWindow': modal,
      },
      rows,
    );
  }
};

//! изменить название функции ниже
export const deleteItemInTable = (table, rows) => {
  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      const delOrNo = confirm(`Удалить данный товар ?`, '');
      if (delOrNo) {
        const id = target.closest('.crm__table-row').id;
        httpRequestDel(`https://quickest-cubic-pyroraptor.glitch.me/api/goods/${id}`, rows);
      } else {
        return;
      };
    }
  });

  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-correct-product') &&
      target.closest('.img-product')) {
      const btn = target.closest('.img-correct-product');
      const url = btn.querySelector('.img-product').getAttribute('data-pic');
      const top = ((screen.height - 600) / 2);
      const left = ((screen.width - 600) / 2);
      open(url, '', 'width = 600,height = 600,top=' + top + ',left=' + left + '');
    }
  });
};

