// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'components/API/getImages';

// import styles from 'styles.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.state.value ||
    prevState.page !== this.state.page) {
      getImages(this.props.value.trim())
      .then((response) => response.json())
        // .then((images) => {
        //   this.setState({ images });
        // })
      
    }
  }

  render() {
    // const { images, error, loading } = this.state;
    return (
      <>
        {/* <ul className={styles.ImageGallery}>
          {this.state.images &&
            this.state.images.total.hits.map(el => {
              return <ImageGalleryItem key={this.state.images.total.hits.id} />;
            })}
        </ul> */}
      </>
    );
  }
}
