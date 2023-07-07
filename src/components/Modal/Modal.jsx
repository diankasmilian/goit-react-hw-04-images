import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, image }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.code === `Escape`) {
      onCloseModal();
    }
  };

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };
  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <ModalWindow>
        <img src={image} alt="ph" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
