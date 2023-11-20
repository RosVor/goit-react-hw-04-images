// src/components/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import { fetchImages } from '../services/api'; // Змінено шлях до файлу api.js
import '../css/styles.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImagesData = useCallback(async () => {
    if (!query) return;

    setIsLoading(true);

    try {
      const data = await fetchImages(query, page);

      if (page === 1) {
        setImages(data);
      } else {
        setImages((prevImages) => [...prevImages, ...data]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImagesData();
  }, [fetchImagesData]);

  const handleInputChange = useCallback((value) => {
    setQuery(value);
    setPage(1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.querySelector('input').value;

    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    } else {
      fetchImagesData();
    }
  };

  const handleImageClick = useCallback((largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setLargeImageURL('');
    setIsModalOpen(false);
  }, []);

  const loadMoreImages = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <div className="App">
      <Searchbar query={query} onChange={handleInputChange} onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={loadMoreImages} />}
      {isModalOpen && <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />}
    </div>
  );
};

export {App};


