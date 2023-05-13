import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryitem from "./ImageGalleryItem/ImageGalleryItem";

export class App extends React.Component {
  state = {
    searchText: '',
  }

  handleSearch = (searchText) => {
    this.setState({searchText});
  }

  render() {
    return (
      <div>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery />
        <ImageGalleryitem searchText={this.state.searchText} />
        <ImageGallery />
      </div>
    );
  }
}
