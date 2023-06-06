import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClose = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <div onClick={this.handleClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}
