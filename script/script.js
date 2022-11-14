const articleModal = document.querySelector('.article');
console.log(articleModal);

const loadGoods = async (cb) => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const data = await result.json();
  return data.data;
};

const dateNow = () => {
  const option = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return (new Date().toLocaleString('ru', option));
}

const renderGoods = async () => {
  const currentArticles = document.querySelectorAll('.articles__item');

  let currentPage = 1;
  let rows = 4;

  const data = await loadGoods();

  const displayList = (arrData, rowPerPage, page) => {

    const articlesList = document.querySelector('.articles__list');
    articlesList.innerHTML = '';
    page--;

    const start = (rowPerPage + currentArticles.length) * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    const date = dateNow();

    paginatedData.forEach(item => {
      const articlesItem = document.createElement('li');
      articlesItem.className = 'articles__item';
      const topic = document.createElement('a');
      topic.id = `${item.id}`;
      topic.setAttribute('onclick', "return false;")
      topic.className = 'topic';

      topic.innerHTML = `
    ${(item.image) ?
          `<img src="${image}" alt="Изображение ${item.time}" class="topic__img">` :
          `<img src="" class="topic__no-img">`
        }
      <div class="topic__wrapper">
        <div class="topic__title-wrapper">
          <h2 class="topic__title">${item.title}</h2>
          ${(item.time) ?
          `<time class="topic__time" datetime="${item.time}">${item.time}</time>` :
          `<time class="topic__time" datetime="${date}">${date}</time>`
        }
      </div>

      <div class="topic__user-box">
        <figure class="topic__user">
          <img src="./img/icon-view.svg" alt="Иконка просмотра" class="topic__views-icon">
          <figcaption class="topic__views-text">${0}</figcaption>
        </figure>
        <figure class="topic__user">
          <img src="./img/icon-chat.svg" alt="Иконка чата" class="topic__views-icon">
          <figcaption class="topic__views-text">${0}</figcaption>
        </figure>

    </div>
    `;
      articlesItem.append(topic);
      articlesList.append(articlesItem);
    });
  }

  const displayPagination = (arrData, articles, rowPerPage) => {
    const paginationList = document.querySelector('.footer__page-list');

    const pagesCount = Math.ceil((articles.length + arrData.length) / rowPerPage);

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);;
      paginationList.append(liEl);
    }
  }

  const displayPaginationBtn = (page) => {
    const liEl = document.createElement('li');
    liEl.className = 'item';
    liEl.textContent = page;

    if (currentPage == page) {
      liEl.classList.add('item__active');
    }

    liEl.addEventListener('click', () => {
      currentPage = page
      displayList(data, rows, currentPage)

      let currentItemLi = document.querySelector('.item__active');
      console.log(currentItemLi);
      currentItemLi.classList.remove('item__active');

      liEl.classList.add('item__active');
    })

    return liEl;
  }

  displayList(data, rows, currentPage);
  displayPagination(data, currentArticles, rows);

};

// манипуляции с модальным окном


const loadAutor = async (userId) => {
  const item = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
  const autorArr = await item.json();
  return autorArr.data;
}

const loadArticle = async (id) => {
  const item = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const data = await item.json();
  return data.data;
}

const renderArticle = async (
  id,
  linkArticle,
  articleTitle,
  articleParagraf,
  autorName,
  articleTime,
  articleChat = 0,
  articleViews = 0,
  articleModal,
) => {

  const params = new URLSearchParams(window.location.search);
  params.append('id', `${id}`);
  console.log(params.toString());

  const arr = await loadArticle(id);
  const autorId = await loadAutor(arr.user_id);
  console.log(arr);
  console.log(autorId);

  articleTitle.innerHTML = `${arr.title}`;
  linkArticle.innerHTML = `${arr.title}`;
  articleParagraf.innerHTML = `${arr.body}`;
  autorName.innerHTML = `${autorId.name}`;
  articleChat.innerHTML = `${arr.chat = 0}`;
  articleViews.innerHTML = `${arr.views = 0}`;

  articleModal.classList.add('article_visible');
};

const articleModalControl = (
  linkArticle,
  articleTitle,
  articleParagraf,
  autorName,
  articleTime,
  articleChat,
  articleViews,
  articleModal,
  articlesList,
) => {

  articlesList.addEventListener('click', e => {
    const target = e.target;
    console.log(target);
    if (target.closest('.topic__title') || target.closest('.topic__no-img')) {
      const id = target.closest('.topic').id;
      renderArticle(
        id,
        linkArticle,
        articleTitle,
        articleParagraf,
        autorName,
        articleTime,
        articleChat,
        articleViews,
        articleModal,
      );
    }
  });

  articleModal.addEventListener('click', e => {
    const target = e.target;
    console.log(target);
    if (target.closest('.link-to-blog') || target.closest('.article__btn-back') || target.closest('.btn-text') || target.closest('.article__btn-back-icon')) {
      articleModal.classList.remove('article_visible');
    }
  })


};



const linkArticle = document.querySelector('.link-to-article');
const articleTitle = document.querySelector('.article__title');
const articleParagraf = document.querySelector('.article__paragraf');
const autorName = document.querySelector('.article__autor-name');
const articleTime = document.querySelector('.article__time');
const articleChat = document.querySelector('.topic__chat-text');
const articleViews = document.querySelector('.topic__views-text');

// const articleModal = document.querySelector('.article');

const articlesList = document.querySelector('.articles__list');


renderGoods();
articleModalControl(
  linkArticle,
  articleTitle,
  articleParagraf,
  autorName,
  articleTime,
  articleChat,
  articleViews,
  articleModal,
  articlesList,
);


console.log(articleModal);