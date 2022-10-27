import { useState, FC, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';
import { Row } from '../Table';
import { FilterReducerAction } from 'src/utils/filterReducer';

interface FiltersProps {
  filterDispatch: React.Dispatch<FilterReducerAction>;
}

// OR

//interface FiltersProps {
//  selected?: {};
//  updateSelected?: (val) => void;
//}

// OR store can be global

const OPTIONS = [
  {
    title: 'Without posts',
  },
  {
    title: 'More than 100 posts',
  },
];

export const Filters = ({ filterDispatch }: FiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const isWithoutPostsActive = selectedFilters.includes(OPTIONS[0].title);
    const isMoreThen100PostsActive = selectedFilters.includes(OPTIONS[1].title);
    console.log('isWithoutPostsActive', isWithoutPostsActive);
    console.log('isMoreThan100PostsActive', isMoreThen100PostsActive);
    filterDispatch({
      type: 'moreThan100Posts',
      payload: isMoreThen100PostsActive,
    });
    filterDispatch({ type: 'withoutPosts', payload: isWithoutPostsActive });
  }, [selectedFilters]);

  const onChange = ({ title }) => {
    let updatedFilters;

    if (selectedFilters.find(filter => filter === title)) {
      updatedFilters = selectedFilters.filter(filter => filter !== title);
    } else {
      updatedFilters = [...selectedFilters, title];
    }

    setSelectedFilters(updatedFilters);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map(option => (
          <li
            value={option.title}
            key={option.title}
            onClick={() => onChange(option)}
          >
            <Checkbox
              checked={
                !!selectedFilters.find(filter => filter === option.title)
              }
              value={option.title}
              size="small"
              color="primary"
              onChange={() => onChange(option)}
            />
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
