import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchProps {
  placeholder?: string;
  searchClassName?: any;
  onChange: (value: string) => void;
  icon?: any;
  iconClassName?: any;
}
const Search: FC<SearchProps> = ({
  placeholder = 'Search',
  searchClassName = 'form-input form-input--search',
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="searchBar">
        <input
          className={searchClassName}
          type="text"
          placeholder={t(placeholder)}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
