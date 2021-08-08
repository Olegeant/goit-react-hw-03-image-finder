import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const {
      image: { largeImageURL, tags },
      onClose,
    } = this.props;
    const { handleBackdropClick } = this;

    return createPortal(
      <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
        <button type="button" className={styles.CloseBtn} onClick={onClose}>
          &#10006;
        </button>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
