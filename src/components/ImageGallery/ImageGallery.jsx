import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'components/API/getImages';
import { Button } from 'components/Button/Button';

import { Audio } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
// import PropTypes from 'prop-types';

import styles from 'styles.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    modalContent: {
      largeImageURL: '',
      tags: '',
    },
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

  openModal = (modalContent) => {
    this.setState({
      modalOpen: true,
      modalContent
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    
    const { images, modalOpen, modalContent } = this.state;
    const { openModal, closeModal } = this;

    return (
      <>
        {modalOpen && (
          <Modal close={closeModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags}></img>
          </Modal>
        )}

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
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onClick={() => openModal({ largeImageURL, tags })}
              />
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
