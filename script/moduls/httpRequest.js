import { renderGoods, showModal } from './renderAndCreate.js';

export const httpRequest = (url, {
  method = 'get',
  callback,
  body = {},
  headers,
  rows,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        callback(new Error(xhr.status), xhr.response);
        return;
      }

      const data = JSON.parse(xhr.response);
      console.log('httpRequest data = ', data);
      console.log('httpRequest', rows);
      if (callback) callback(null, data, rows);
    });

    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response);
    });

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
    console.log('ошибка');
  }
};

export const productsRender = (url, rows) => {
  httpRequest(url, {
    methed: 'get',
    callback: renderGoods,
    rows: rows,
  });
};

export const changeProductRender = (url, rows) => {
  httpRequest(url, {
    methed: 'get',
    callback: showModal,
    'rows': rows,
  });
};

export const httpRequestDel = (url, rows) => {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', url);

  xhr.addEventListener('load', () => {
    if (xhr.status < 204 || xhr.readyState === 4) {
      console.log('Good request');
      productsRender(`https://quickest-cubic-pyroraptor.glitch.me/api/goods`, rows);
    } else {
      throw new Error('Bad request');
    }
  });

  xhr.send();
};


