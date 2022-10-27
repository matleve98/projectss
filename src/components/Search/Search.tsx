import { useState, FC } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';
import { Row } from '../Table';
import { FilterReducerAction } from 'src/utils/filterReducer';

interface SearchProps {
  filterDispatch: React.Dispatch<FilterReducerAction>;
}
// OR

//interface SearchProps {
//  selected?: {};
//  updateSelected?: (val) => void;
//}

// OR store can be global

export const Search = ({ filterDispatch }: SearchProps) => {
  const [searchedValue, setSearchedValue] = useState('');

  const onChange = value => {
    filterDispatch({ type: 'searchFilter', payload: value });
    setSearchedValue(value);
  };

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => onChange(e.target.value)}
    />
  );
};
