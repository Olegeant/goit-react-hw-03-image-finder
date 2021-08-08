import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imageAPI from './utils/image-api.js';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Notification from './components/Notification/Notification';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ScrollArrow from './components/ScrollArrow/ScrollArrow';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: '',
    pagesDisplayed: 1,
    images: [],
    error: null,
    status: Status.IDLE,
    isModalOpen: false,
    modalImage: null,
    isLoading: false,
    isLoadBtnShown: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    const prevPage = prevState.pagesDisplayed;
    const nextPage = this.state.pagesDisplayed;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING, isLoading: true });

      imageAPI
        .fetchImages(nextQuery, nextPage)
        .then(this.handleData)
        .then(images => {
          if (images.length === 0) {
            if (nextPage === 1) {
              toast.error('No images for this query. Try another search');
            } else {
              toast.error(
                'No more images on Pixabay! You may add your images!',
              );
            }

            this.setState({ isLoadBtnShown: false });
          } else {
            this.setState({ isLoadBtnShown: true });
          }

          this.setState({
            images: [...this.state.images, ...images],
            pagesDisplayed: nextPage,
            status: Status.RESOLVED,
            isLoading: false,
          });

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => {
          toast.error(error.message);
          this.setState({ error, status: Status.REJECTED, isLoading: false });
        });
    }
  }

  handleData = data => {
    return data.hits
      .map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      }))
      .filter(image => !this.state.images.some(({ id }) => id === image.id));
  };

  toggleModal = () => {
    this.setState(prevstate => ({ isModalOpen: !prevstate.isModalOpen }));
  };

  onImageClick = clickedImgId => {
    const clickedImage = this.state.images.find(image => {
      return clickedImgId === image.id;
    });
    this.setState({ modalImage: clickedImage });

    this.toggleModal();
  };

  addPage = () => {
    this.setState({ pagesDisplayed: this.state.pagesDisplayed + 1 });
  };

  handleFormSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      this.addPage();
      return;
    }

    this.setState({
      searchQuery,
      images: [],
      pagesDisplayed: 1,
    });
  };

  render() {
    const {
      status,
      error,
      images,
      isModalOpen,
      modalImage,
      isLoadBtnShown,
      isLoading,
    } = this.state;

    const { handleFormSubmit, toggleModal, onImageClick, addPage } = this;

    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />

        {status === Status.IDLE && (
          <Notification type="info">
            No images yet. Please enter the query for search!
          </Notification>
        )}

        {status === Status.RESOLVED && images.length === 0 && (
          <Notification type="warning">No search results...</Notification>
        )}

        {status === Status.REJECTED && images.length === 0 && (
          <Notification type="error">
            ERROR OCCURRED! {error.message}
          </Notification>
        )}

        <ImageGallery images={images} onImgClick={onImageClick} />

        {isLoadBtnShown && (
          <Button onClick={addPage} loading={isLoading}>
            Load more...
          </Button>
        )}

        {<ToastContainer autoClose={3000} />}

        {isModalOpen && <Modal image={modalImage} onClose={toggleModal} />}

        {isLoading && (
          <Loader type="ThreeDots" color="#3f51b5" height={180} width={180} />
        )}

        <ScrollArrow type="down" />
        <ScrollArrow type="up" />
      </>
    );
  }
}

export default App;
