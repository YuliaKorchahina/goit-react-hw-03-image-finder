import styles from 'styles.module.css';


export const ImageGalleryItem = ({id, webformatURL}) => {
  return (
    // <ul className={styles.ImageGallery}>
      
      <>
      <li key={id} className={styles.ImageGalleryItem}>
        <img className={styles.ImageGalleryItem_image} src={webformatURL} alt="" />
      </li>
      </>
      // </ul>
  );
};
