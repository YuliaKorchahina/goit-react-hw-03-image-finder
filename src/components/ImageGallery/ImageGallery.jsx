import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'components/API/getImages';
import { Button } from 'components/Button/Button';

import { Audio } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
// import PropTypes from 'prop-types';

import styles from 'styles.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (prevProps.value !== value || prevState.page !== this.state.page) {
      this.setState({ loading: true });
      getImages(value.trim(), this.state.page)
        .then(response => response.json())
        .then(data => {
          this.setState(({ images }) => ({
            images: [...images, ...data.hits],
          }));
          if (!data.hits.length) {
            toast.error(
              `Oooops... No information for your request ${this.props.value}`
            );
          }
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoad = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images } = this.state;
    console.log(images);
    console.log(this.props.value);
    return (
      <>
        {this.state.loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            // wrapperClass
          />
        )}
        <ul className={styles.ImageGallery}>
          {images.map(el => {
            return (
              <ImageGalleryItem key={el.id} webformatURL={el.webformatURL} />
            );
          })}
        </ul>

        {images.length && <Button onClick={this.handleLoad} />}
      </>
    );
  }
}

ImageGallery.defaultProps = {
  images: [],
};
