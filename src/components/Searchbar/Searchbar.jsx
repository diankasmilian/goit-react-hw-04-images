import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { SearchForm, HeaderSearch } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleValueChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Enter a value');
      return;
    }

    onSubmit(value);
    setValue('');
  };
  return (
    <HeaderSearch className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <BsSearch />
        </button>

        <input
          className="input"
          value={value}
          onChange={handleValueChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderSearch>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
