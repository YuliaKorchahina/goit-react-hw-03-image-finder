// import { Modal } from 'components/Modal/Modal';
import styles from 'styles.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  onClick
}) => {
  return (
    <>
      <li key={id} onClick={onClick} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItem_image}
          src={webformatURL}
          alt=""
        />
      </li>
      {/* <Modal largeImageURL={largeImageURL} /> */}
    </>
  );
};
