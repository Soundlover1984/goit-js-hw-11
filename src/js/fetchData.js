import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchData(searchQuery, pageStart) {
    const API_KEY = "35507797-1d7e5cbb70f4cd108be967f63";

   const searchParams = new URLSearchParams({
     key: API_KEY,
     q: searchQuery,
     image_type: 'photo',
     orientation: 'horizontal',
     safesearch: true,
     page: pageStart,
     per_page: 40,
   });

  const url = `https://pixabay.com/api/?${searchParams}`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      Notiflix.Notify.failure('Oops, something is going wrong. Please try again');
      return Promise.reject();
    }
    return response;
  } catch (error) {
    Notiflix.Notify.failure('Oops, something went wrong. Please try again');
    return Promise.reject(error);
  }
}

 



















