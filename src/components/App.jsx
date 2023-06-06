import React, { Component } from 'react';
import { getSearch } from 'api/getSearch';
import { Toaster } from 'react-hot-toast';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal'; // Poprawiony import
import { Searchbar } from 'components/Searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    loading: false,
    error: null,
    empty: false,
    showModal: false,
    largeImageURL:'',
    alt: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.getFunc(this.state.search, this.state.page);
    }
  }

  getFunc = (text, page) => {
    this.setState({ loading: true });

    console.log('Wpisana fraza wyszukiwania:', text);

    getSearch(text, page)
      .then(resp => resp.json())
      .then(data => {
        console.log('Odpowiedź z API:', data);

        if (data.hits.length === 0) {
          this.setState({ empty: true });
        }
        this.setState(prevSt => ({
          page: prevSt.page,
          images: [...prevSt.images, ...data.hits],
          total: data.total,
        }));
      })
      .catch(error => {
        console.error('Błąd w żądaniu API:', error);

        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  clickLoad = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1,
    }));
  };

  openModal = (largeImageURL, alt) => {
    this.setState({
      showModal: true,
      largeImageURL,
      alt,
    });
  };

  handleSubmit = search => {
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      alt: '',
    });
  };

  render() {
    const { error, loading, images, total, page } = this.state;
    return (
      <div>
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />

        <Searchbar handleSubmit={this.handleSubmit} />

        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Something went wrong: ({error})!
          </h2>
        )}

        <ImageGallery togleModal={this.openModal} images={images} />

        {loading && <Loader />}

        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry. There are no images ...
          </h2>
        )}

        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
