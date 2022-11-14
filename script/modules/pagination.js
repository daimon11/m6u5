export const paginationControl = (btnPrev, btnNext, pagesBtn, currentActive) => {


  pagesBtn.forEach((item, index) => {
    if ((index + 1) === currentActive) {
      item.classList.add('item__active');
    } else {
      item.classList.remove('item__active');
    }
  });

  if (currentActive === 1) {
    btnPrev.setAttribute('disabled', 'disabled');
    btnPrev.querySelector('.item-icon').classList.add('item-icon__disabled');
    btnNext.querySelector('.item-icon').classList.remove('item-icon__disabled');
  } else if (currentActive === 3) {
    btnNext.setAttribute('disabled', 'disabled');
    btnNext.querySelector('.item-icon').classList.add('item-icon__disabled');
    btnPrev.querySelector('.item-icon').classList.remove('item-icon__disabled');
  } else {
    btnPrev.removeAttribute('disabled', 'disabled');
    btnNext.removeAttribute('disabled', 'disabled');
    btnPrev.querySelector('.item-icon').classList.remove('item-icon__disabled');
    btnNext.querySelector('.item-icon').classList.remove('item-icon__disabled');
  }

  const update = () => {
    pagesBtn.forEach((item, index) => {
      if ((index + 1) === currentActive) {
        item.click();
        item.classList.add('item__active');
      } else {
        item.classList.remove('item__active');
      }
    })
  }

  btnNext.addEventListener('click', () => {
    currentActive++;
    if (currentActive >= pagesBtn.length) {
      currentActive = pagesBtn.length;
    } else {
      btnPrev.removeAttribute('disabled');
    }
    update();
  })

  btnPrev.addEventListener('click', () => {
    currentActive--;
    if (currentActive <= 1) {
      currentActive = 1;
    } else {
      btnPrev.removeAttribute('disabled');
    }
    update();
  })
}