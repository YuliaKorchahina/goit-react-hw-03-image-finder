import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'components/API/getImages';
import { Button } from 'components/Button/Button';

import { Audio } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
// import PropTypes from 'prop-types';

import styles from 'styles.module.css';
import { Modal } from 'components/Modal/Modal';

const defaultStateData = {
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
export class ImageGallery extends Component {
  state = {
    ...defaultStateData,
  };

  settingState(data, isNewData = true) {
    this.setState(prevState => ({
      images: [...(!isNewData ? prevState.images : []), ...data],
      page: ++prevState.page,
    }));
    if (!data.hits.length) {
      toast.error(
        `Oooops... No information for your request ${this.props.value}`
      );
    }
  }

  requestImages(value, isNewData, page) {
    getImages(value.trim(), page)
      .then(response => response.json())
      .then(data => {
        this.settingState(data.hits, isNewData);
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.setState({ ...defaultStateData });
      this.requestImages(value, true, defaultStateData.page);
    }
  }

  handleLoad = () => {
    const { value } = this.props;
    this.requestImages(value, false, this.state.page);
  };

  openModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
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

        {images.length ? <Button onClick={this.handleLoad} /> : <></>}
      </>
    );
  }
}

ImageGallery.defaultProps = {
  images: [],
};
