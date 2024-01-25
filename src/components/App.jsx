import React, { useState, useCallback, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './api';
import '../css/styles.css';

const App = () => {
  const [shouldFetchImages, setShouldFetchImages] = useState(false);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImagesCallback = useCallback(() => {
    setIsLoading(true);
    fetchImages(query, page, setImages, setPage, setTotalHits, setIsLoading);
  }, [query, page, setImages, setPage, setTotalHits, setIsLoading]);

  const handleInputChange = (value) => {
    setQuery(value);
    setShouldFetchImages(false);
  };

  const handleSubmit = () => {
    setPage(1);
    setImages([]);
    setShouldFetchImages(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setShouldFetchImages(true);
  };

  useEffect(() => {
    if (shouldFetchImages) {
      fetchImagesCallback();
      setShouldFetchImages(false);
    }
  }, [shouldFetchImages, fetchImagesCallback]);

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setIsModalOpen(true);
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
        <Button onClick={handleLoadMore}>Load More</Button>
      )}

      {isModalOpen && <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />}
    </div>
  );
};

export { App };

