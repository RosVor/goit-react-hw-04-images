import React, { useEffect } from 'react';

const Modal = ({ largeImageURL, onClose, query, page }) => {
  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [onClose]);

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






