 import styles from './ImageCard.module.css';

 interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard = ({ src, alt }:ImageCardProps) => {
  return (
    <div className={styles.card}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};

export default ImageCard;