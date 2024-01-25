const fetchImages = async (query, page, setImages, setPage, setTotalHits, setIsLoading) => {
  const apiKey = '38418747-ec354076649bfa1b688ea2611';
  const baseUrl = 'https://pixabay.com/api/';
  const perPage = 12;

  try {
    setIsLoading(true);

    const response = await fetch(
      `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    const data = await response.json();
    console.log('Data from server:', data);

    if (page === 1) {
      setImages(data.hits);
    } else {
      setImages((prevImages) => [...prevImages, ...data.hits]);
    }

    setPage((prevPage) => prevPage + 1);
    setTotalHits(data.totalHits);
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    setIsLoading(false);
  }
};

export default fetchImages;