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

  const fetchImages = useCallback(() => {
    if (!query) return;

    const apiKey = '38418747-ec354076649bfa1b688ea2611';
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );
        const data = await response.json();

        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages((prevImages) => [...prevImages, ...data.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  useEffect(() => {
    fetchImages();

  }, [fetchImages]);

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
      fetchImages();
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
      {images.length > 0 && !isLoading && (
        <Button onClick={loadMoreImages} />
      )}
      {isModalOpen && <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />}
    </div>
  );
};

export {App};


