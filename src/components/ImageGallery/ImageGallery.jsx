import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'components/API/getImages';

import styles from 'styles.module.css';

export class ImageGallery extends Component {
  state = {
    images: null,
    // loading: false,
    // error: null,
    // page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (prevProps.value !== value || prevState.page !== this.state.page) {
      getImages(value.trim())
        .then(response => response.json())
        .then(images => {
          this.setState({ images });
        });
    }
  }

  render() {
    const { images } = this.state;
    return (
      <>
        <ul className={styles.ImageGallery}>
          {images &&
            images.hits.map(el => {
              return (
                <ImageGalleryItem key={el.id} webformatURL={el.webformatURL} />
              );
            })}
        </ul>
      </>
    );
  }
}
