import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onImgClick }) {
  const handleClick = evt => {
    if (evt.target === evt.currentTarget) return;

    const clickedImgId = Number(evt.target.dataset.id);
    onImgClick(clickedImgId);
  };

  return (
    <ul className={styles.ImageGallery} onClick={handleClick}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          url={image.webformatURL}
          tags={image.tags}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
