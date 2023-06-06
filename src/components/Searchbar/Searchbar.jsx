import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { MdImageSearch } from 'react-icons/md';
import css from './Searchbar.module.css';
// import 'react-notifications-component/dist/theme.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  onChangeInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });

    console.info('Wpisano wartość:', value);
  };

  resetForm = () => {
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.SearchBar}>
        <form
          onSubmit={e => {
            e.preventDefault();

            if (!this.state.search) {
              return toast.error('Enter text for search.');
            }

            this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.Form}
        >
          <button type="submit" className={css.Button}>
            <MdImageSearch size="30" />
          </button>

          <input
            value={this.state.search}
            onChange={this.onChangeInput}
            className={css.Input}
            autoFocus
            name="search"
            type="text"
            autoComplete="off"
            placeholder="Search images or photos"
          />
        </form>
      </header>
    );
  }
}
