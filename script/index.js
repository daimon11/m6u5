// import { numberPage } from './modules/getNumberPage.js';
import { paginationControl } from './modules/pagination.js';
import { renderGoods } from './modules/renderArticleList.js';
import { renderArticle } from './modules/renderArticlePage.js'

const renderArticles = (page) => {

  const btnPrev = document.querySelector('.footer__btn-prev');
  const btnNext = document.querySelector('.footer__btn-next');
  const pagesBtn = document.querySelectorAll('.item');

  paginationControl(btnPrev, btnNext, pagesBtn, page);
  renderGoods(page);
}

let url = window.location.search;
let searchParams = new URLSearchParams(url);
if (searchParams.has("id")) {
  let id = searchParams.get("id") ?
    searchParams.get("id") : '';

  const linkArticle = document.querySelector('.link-to-article');
  const articleTitle = document.querySelector('.article__title');
  const articleParagraf = document.querySelector('.article__paragraf');
  const autorName = document.querySelector('.article__autor-name');
  const articleTime = document.querySelector('.article__time');
  const articleChat = document.querySelector('.topic__chat-text');
  const articleViews = document.querySelector('.topic__views-text');

  const articleModal = document.querySelector('.article');

  renderArticle(    
    id,
    linkArticle,
    articleTitle,
    articleParagraf,
    autorName,
    articleTime,
    articleChat,
    articleViews,
    articleModal
    );
} else {
  let page = searchParams.get("page") ?
    searchParams.get("page") : 1;

  let currentPage = page;

  let currentActive = +currentPage;

  renderArticles(currentActive);
};





