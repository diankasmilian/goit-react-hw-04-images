import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMore } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ErrorTitle } from 'components/ErrorTitle/ErrorTitle';
import * as API from '../../services/image-api';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (value === '') {
      return;
    }
    searchImage(value, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, value]);

  const searchImage = async (value, page) => {
    setLoader(true);
    try {
      const { hits, totalHits } = await API.getImage(value, page);

      if (hits.length === 0) {
        setError('😥OOPS... undefined image');
        setLoader(false);
        return;
      }

      setImages(state => [...state, ...hits]);
      setTotal(totalHits);
      setError(null);
      setLoader(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const onOpenModal = largeImage => {
    setShowModal(true);
    setLargeImage(largeImage);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
  };

  const handleFormSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {loader && <Loader />}
      {error && <ErrorTitle message={error} />}
      {images.length !== 0 && (
        <>
          <ImageGallery images={images} openModal={onOpenModal} />
          {page < Math.ceil(total / 12) && (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
        </>
      )}
      {showModal && <Modal image={largeImage} onCloseModal={onCloseModal} />}

      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
};

