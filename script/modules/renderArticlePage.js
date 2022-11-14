import { dateNow } from './renderArticleList.js';

const date = dateNow();

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

export const renderArticle = async (
  id,
  linkArticle,
  articleTitle,
  articleParagraf,
  autorName,
  articleTime,
  articleChat,
  articleViews,
  articleModal,
) => {

  const params = new URLSearchParams(window.location.search);
  params.append('id', `${id}`);

  const arr = await loadArticle(id);
  const autorId = await loadAutor(arr.user_id);
  console.log('arr', arr);
  console.log('autorId', autorId);

  articleTitle.innerHTML = `${arr.title}`;
  linkArticle.innerHTML = `${arr.title}`;
  articleParagraf.innerHTML = `${arr.body}`;
  autorName.innerHTML = `${autorId.name}`;
  articleChat.innerHTML = `${0}`;
  articleViews.innerHTML = `${0}`;
  articleTime.innerHTML = `${date}`;

  articleModal.classList.add('article_visible');
};


export const articleModalControl = (
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
  
  // articleModal.addEventListener('click', e => {
  //   const target = e.target;
  //   console.log(target);
  //   if (target.closest('.link-to-blog') || target.closest('.article__btn-back') || target.closest('.btn-text') || target.closest('.article__btn-back-icon')) {
  //     articleModal.classList.remove('article_visible');
  //   }
  // })


};
