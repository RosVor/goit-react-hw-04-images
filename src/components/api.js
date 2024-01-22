const fetchImages = async (query, page, setImages, setPage, setTotalHits, setIsLoading) => {
    const apiKey = '38418747-ec354076649bfa1b688ea2611';
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;
  
    setIsLoading(true);
  
    try {
      const response = await fetch(
        `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
  
      const data = await response.json();
  
      setImages((prevImages) => (page === 1 ? data.hits : [...prevImages, ...data.hits]));
      setPage((prevPage) => prevPage + 1);
      setTotalHits(data.totalHits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  export default fetchImages;
  