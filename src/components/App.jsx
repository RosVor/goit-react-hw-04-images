import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './api';
import '../css/styles.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const handleSubmit = (value) => {
    setPage(1);
    setImages([]);
    setQuery(value);
  };

  const handleLoadMore =  () => {
    setPage((prevPage) => prevPage + 1);
};

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
          setImages((prevImages) => [...prevImages, ...data.hits]);
  
        setTotalHits(data.totalHits);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query ) {
      fetchData();
    }
  }, [query, page]);

  return (
    <div className="App">
      <Searchbar query={query} onSubmit={handleSubmit} />

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