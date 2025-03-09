import React, { useState, InputHTMLAttributes, forwardRef } from 'react';
import { Input, InputProps } from '../Input';
import './SearchInput.css';
import { SearchInputProps } from './types';

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      value,
      onChange,
      searchButtonLabel = 'Search',
      showSearchButton = false,
      onClear,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>((value as string) || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(inputValue);
      }
    };

    const handleSearch = () => {
      if (onSearch) {
        onSearch(inputValue);
      }
    };

    const handleClear = () => {
      setInputValue('');
      if (onClear) {
        onClear();
      }
    };

    const searchIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    );

    return (
      <div className="sb-search-input-container">
        <Input
          type="search"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          leftIcon={searchIcon}
          onClear={handleClear}
          className="sb-search-input"
          ref={ref}
          {...rest}
        />

        {showSearchButton && (
          <button
            className="sb-search-button"
            type="button"
            onClick={handleSearch}
            disabled={rest.disabled}
          >
            {searchButtonLabel}
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
