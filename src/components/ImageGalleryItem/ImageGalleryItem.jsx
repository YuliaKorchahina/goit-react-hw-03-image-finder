// import { Modal } from 'components/Modal/Modal';
import styles from 'styles.module.css';

export const ImageGalleryItem = ({  webformatURL, onClick, tags }) => {
  return (
    <>
      <li onClick={onClick} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
        />
      </li>
    </>
  );
};
