import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, GalleryContainer } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryContainer>
      <Gallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            tags={image.tags}
            imageModal={image.largeImageURL}
            openModal={openModal}
          />
        ))}
      </Gallery>
    </GalleryContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
