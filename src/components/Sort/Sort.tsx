import { FC } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import styles from './Sort.module.scss';
import { FilterReducerAction } from 'src/utils/filterReducer';

interface SortProps {
  filterDispatch: React.Dispatch<FilterReducerAction>;
}

export const Sort: FC<SortProps> = ({ filterDispatch }) => {
  const handleChange = value => {
    if (value === 'asc') {
      filterDispatch({ type: 'asc', payload: true });
      filterDispatch({ type: 'desc', payload: false });
    }
    if (value === 'desc') {
      filterDispatch({ type: 'asc', payload: false });
      filterDispatch({ type: 'desc', payload: true });
    }
  };

  return (
    <FormControl className={styles.control} component="fieldset">
      <FormLabel className={styles.label}>Sort by payments</FormLabel>
      <RadioGroup
        className={styles.group}
        aria-label="sorting"
        name="radio-buttons-group"
        onChange={e => handleChange(e.target.value)}
      >
        <FormControlLabel value="desc" control={<Radio />} label="desc" />
        <FormControlLabel value="asc" control={<Radio />} label="asc" />
      </RadioGroup>
    </FormControl>
  );
};
