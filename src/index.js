import { fetchData } from "./js/fetchData";
import axios from "axios";
import Notiflix from "notiflix";
import { createMarkUp } from "./js/markUp";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchSection = document.querySelector('.search');
const formEl = document.querySelector('#search-form');
const inputData = document.querySelector('.search__input');
const renderGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
inputData.addEventListener('focus', onInputChange);

function onInputChange() {
  searchSection.style.backgroundColor = "rgba(154, 205, 50, 1)";
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

let searchQuery = null;
let pageStart = 1;

function onFormSubmit(event) {
  event.preventDefault();
  searchSection.style.backgroundColor = "rgba(154, 205, 50, 0.5)";
  searchQuery = event.currentTarget.elements.searchQuery.value;

  try {
    fetchData(searchQuery, pageStart).then(result => {
      const data = result.data;
      const total = data.totalHits;
      const picsArr = data.hits;
      const picsLeft = total - picsArr.length * pageStart;

      if (searchQuery === '') {
        Notiflix.Notify.warning(
          'Please enter key words for search.'
        );
        renderGallery.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');
        return;
      }

      if (picsArr.length > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${total} images.`
        );
      }

      if (picsArr.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        renderGallery.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');
        return;
      }

      if (picsLeft > 0) {
        loadMoreBtn.classList.remove('is-hidden');
      }

      renderGallery.innerHTML = '';

      const markUp = createMarkUp(picsArr);
      renderGallery.insertAdjacentHTML('beforeend', markUp);
      pageStart += 1;
      lightbox.refresh();
    });
  } catch {
    error => {
      console.log(error);
    };
  }

 formEl.reset();
}

function onLoadMoreBtnClick() {
  try {
    fetchData(searchQuery, pageStart).then(result => {
      const data = result.data;
      const total = data.totalHits;
      const picsArr = data.hits;
      const picsLeft = total - 40 * pageStart;

      const markUp = createMarkUp(picsArr);
      renderGallery.insertAdjacentHTML('beforeend', markUp);

      if (picsLeft <= 0) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        pageStart = 1;
        return;
      }
      lightbox.refresh();
      pageStart += 1;
    });
  } catch {
    error => {
      console.log(error);
    };
  }
}
