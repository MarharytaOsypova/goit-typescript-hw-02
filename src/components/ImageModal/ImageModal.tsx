import   { useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { Image } from '../../types';

 

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }:ImageModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      {image && (
        <div className={styles.content}>
          <img src={image.fullSrc} alt={image.alt} className={styles.image} />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;