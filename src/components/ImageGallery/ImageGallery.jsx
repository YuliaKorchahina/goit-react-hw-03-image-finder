import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'components/API/getImages';

import { Audio } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';


import styles from 'styles.module.css';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: null,
    // page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (prevProps.value !== value || prevState.page !== this.state.page) {
      this.setState({ loading: true });
      getImages(value.trim(), this.state.page)
        .then(response => response.json())
        .then(images => {
          console.log(images);
          this.setState({ images });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoad = () => {
    this.setState(({page}) => ({
        page: page + 1
    }))
  }


  render() {
    const { images } = this.state;
    return (
      <>
      {this.state.error &&  toast.error(`Oooops... No information for your request ${this.props.value}`)}
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
