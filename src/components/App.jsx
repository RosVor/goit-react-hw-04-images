import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import '../css/styles.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const handleInputChange = (value) => {
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setImages([]);
  };

  const fetchImages = useCallback(() => {
    const apiKey = '38418747-ec354076649bfa1b688ea2611';
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;
  
    setIsLoading(true);
  
    fetch(
      `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages((prevImages) => [...prevImages, ...data.hits]);
        }
        setPage((prevPage) => prevPage + 1);
        setTotalHits(data.totalHits);
      })
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => setIsLoading(false));
  }, [query, page, setImages, setPage, setTotalHits, setIsLoading]);
  
  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        fetchImages();
      }
    };

    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [query, page, fetchImages]);

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    fetchImages();
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Searchbar query={query} onChange={handleInputChange} onSubmit={handleSubmit} />

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {isLoading && <Loader />}

      {images.length > 0 && images.length < totalHits && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}

      {isModalOpen && <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />}
    </div>
  );
};
export {App};