import { fetchData } from "./js/fetchPictures";
import axios from "axios";
import Notiflix from "notiflix";
import { createMarkUp } from "./js/markUp";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchSection = document.querySelector('.search');
const formEl = document.querySelector('#search-form');
const inputData = document.querySelector('.search__input');
const iconEl = document.querySelector('[data-icon]');
const renderGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = null;
let pageStart = 1;


formEl.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
inputData.addEventListener('focus', onInputChange);

function onInputChange() {
    inputData.style.backgroundColor = 'hsla(248, 39%, 39%, 1)';
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    scrollZoom: false,
});

function onFormSubmit(event) {
    event.preventDefault();
    searchSection.style.backgroundColor = 'hsla(248, 39%, 39%, 0.7)';
    searchQuery = event.currentTarget.elements.searchQuery.value;
}

try {
    fetchData(searchQuery, pageStart).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const picsArr = data.hits;
        const picsLeft = total - picsArr.length * pageStart;
    })

    if (searchQuery === "") {
        Notiflix.Notify.warning(
        'Please enter key words for search.'
        );
    }
    if (picsArr.length > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${total} images.`
        );
      }

} 




