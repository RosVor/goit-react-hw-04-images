const apiKey = '38418747-ec354076649bfa1b688ea2611';
const baseUrl = 'https://pixabay.com/api/';
const perPage = 12;

export const fetchImages = async (query, page) => {
  const response = await fetch(
    `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  const data = await response.json();
  return data.hits;
};

