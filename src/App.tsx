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

export const App: FC = () => {
  const [data, setData] = useState<Row[]>();
  const [activeUsers, setActiveUsers] = useState<Row[]>([]);
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        const userData = usersDataConverter({ accounts, images, users });
        setData(userData);
        setActiveUsers(userData);
      }
    );
  }, []);

  useEffect(() => {
    if (!filters) {
      return;
    }
    const { moreThan100Posts, searchFilter, withoutPosts } = filters;

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

  useEffect(() => {
    const { asc, desc } = filters;
    if (desc) {
      setActiveUsers(
        activeUsers
          .slice()
          .sort(
            (prevUser, nextUser) =>
              nextUser.lastPayments - prevUser.lastPayments
          )
      );
    }

    if (asc) {
      setActiveUsers(
        activeUsers
          .slice()
          .sort(
            (prevUser, nextUser) =>
              prevUser.lastPayments - nextUser.lastPayments
          )
      );
    }
  }, [filters.asc, filters.desc]);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters filterDispatch={dispatch} />
            <Sort filterDispatch={dispatch} />
          </div>
          <Search filterDispatch={dispatch} />
        </div>
        {activeUsers && <Table rows={activeUsers} />}
      </div>
    </StyledEngineProvider>
  );
};
