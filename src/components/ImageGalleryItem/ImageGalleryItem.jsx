import React from "react";
import { getSearchNews } from "./api.api";
import { Audio } from 'react-loader-spinner'
import { Ul } from "../ImageGallery/ImageGallery.styled";
import { Li } from "./Imagegalleryitem.styled";
import { Img } from "./Imagegalleryitem.styled";
import Modal from "components/Modal/Modal";
import PropTypes from 'prop-types';

export default class ImageGalleryitem extends React.Component {
  state = {
    news: [],
    error: null,
    isLoading: false,
    page: 1, // текущая страница
    isModalOpen: false, // открыто ли модальное окно
    selectedImage: null // выбранное изображение
  };

  static propTypes = {
    searchText: PropTypes.string.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ news: [], error: null, isLoading: true, page: 1 }); // сброс результатов поиска и текущей страницы перед загрузкой новых данных
      getSearchNews(this.props.searchText, 1) // указываем номер страницы 1 при первой загрузке
        .then((data) => {
          this.setState({ news: data.hits, error: null });
        })
        .catch((error) => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    const { page, news } = this.state;
    const nextPage = page + 1;
    this.setState({ isLoading: true });
    getSearchNews(this.props.searchText, nextPage)
      .then((data) => {
        this.setState({ news: [...news, ...data.hits], error: null, page: nextPage }); // добавляем новые результаты к уже существующим
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleOpenModal = (imageUrl) => {
    this.setState({ selectedImage: imageUrl, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };

  render() {
    const { news, error, isLoading, isModalOpen, selectedImage } = this.state;
    return (
      <>
        {error && <p>{error.message}</p>}
        <Ul>
          {news.map((item) => (
            <Li key={item.id} onClick={() => this.handleOpenModal(item.largeImageURL)}>
              <Img src={item.webformatURL} alt={item.tags} />
            </Li>
          ))}
        </Ul>
        {isLoading && <Audio type="ThreeDots" color="#00BFFF" height={80} width={80} />}
        {news.length > 0 && (
          <button type="button" onClick={this.handleLoadMore}>
            Load more
          </button>
        )}
        {isModalOpen && (
          <Modal onClose={this.handleCloseModal} large={selectedImage} />
        )}
      </>
    );
  }
}
