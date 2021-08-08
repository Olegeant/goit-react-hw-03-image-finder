const RESOURCE_URL = 'https://pixabay.com/api/';
const API_KEY = '21850804-e13ac47ee6c84255406cdac88';
const PER_PAGE_DEFAULT = 12;

const OPTIONS = {};

function fetchImages(query, page = 1) {
  const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: query,
    page,
    per_page: PER_PAGE_DEFAULT,
    key: API_KEY,
  });

  const url = RESOURCE_URL + '?' + searchParams;

  return fetch(url, OPTIONS).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Unexpected error from server side'));
  });
}

const api = {
  fetchImages,
};

export default api;
