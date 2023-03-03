import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    search: '',
  };

  handleSubmit = search => {
    this.setState({ search });
  };

  render() {
    const {search} = this.state;
    return (
      <div>
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery value={search} />
        <Button />
      </div>
    );
  }
}
