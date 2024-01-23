// Modal.js
import React, { useEffect } from 'react';

const Modal = ({ largeImageURL, onClose, onRequestMore, query, page }) => {
  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        onRequestMore(query, page);
      }
    };

    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [onRequestMore, query, page]);

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackDropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;




