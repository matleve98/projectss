import { FC, useReducer } from 'react';
import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Image, User, Account } from '../types';
import { Table, Filters, Sort, Search, Row } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';
import { usersDataConverter } from './utils/usersDataConverter';
import {
  filterReducer,
  FilterReducerAction,
  initialFilterState,
} from './utils/filterReducer';

// mockedData has to be replaced with parsed Promises’ data
// const mockedData: Row[] = rows.data;

export const App: FC = () => {
  const [data, setData] = useState<Row[]>();
  const [activeUsers, setActiveUsers] = useState<Row[]>([]);
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        const userData = usersDataConverter({ accounts, images, users });
        setData(userData);
        setActiveUsers(userData);
      }
    );
  }, []);

  useEffect(() => {
    // const activeFilters: Array<FilterReducerAction['type']> = Object.values(filters).filter(filter => filter[1] ).map(filter => filter[0]);
    if (!filters) {
      return;
    }
    console.log(filters);
    const { asc, desc, moreThan100Posts, searchFilter, withoutPosts } = filters;
    if (asc) {
      setActiveUsers(activeUsers.sort());
    }
    if (desc) {
      setActiveUsers(
        activeUsers.sort((a, b) => a.lastPayments - b.lastPayments)
      );
    }
    if (moreThan100Posts || withoutPosts || searchFilter) {
      setActiveUsers(
        data.filter(user => {
          if (moreThan100Posts && user.posts > 100) {
            return true;
          }
          if (withoutPosts && !user.posts) {
            return true;
          }
          if (
            searchFilter &&
            (user.username === searchFilter ||
              searchFilter === user.name ||
              searchFilter === user.country)
          ) {
            return true;
          }
          return false;
        })
      );
    } else {
      setActiveUsers(data);
    }
  }, [filters]);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters filterDispatch={dispatch} />
            <Sort />
          </div>
          <Search filterDispatch={dispatch} />
        </div>
        {activeUsers && <Table rows={activeUsers} />}
      </div>
    </StyledEngineProvider>
  );
};
