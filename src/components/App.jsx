import React, { useState, useEffect, useCallback } from 'react';
import fetchImages from './api'; 
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
    fetchImages(query, 1, setImages, setPage, setTotalHits, setIsLoading);
  };

  const fetchImagesCallback = useCallback(() => {
    fetchImages(query, page, setImages, setPage, setTotalHits, setIsLoading);
  }, [query, page, setImages, setPage, setTotalHits, setIsLoading]);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        fetchImagesCallback();
      }
    };

    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [query, page, fetchImagesCallback]);


  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    fetchImagesCallback();
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