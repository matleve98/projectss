export interface FilterReducerAction {
  type: 'withoutPosts' | 'moreThan100Posts' | 'desc' | 'asc' | 'searchFilter';
  payload: boolean | string;
}

export interface FilterState {
  withoutPosts: boolean;
  moreThan100Posts: boolean;
  desc: boolean;
  asc: boolean;
  searchFilter: string;
}

export const filterReducer = (
  state: FilterState,
  action: FilterReducerAction
): FilterState => {
  return { ...state, [action.type]: action.payload };
};

export const initialFilterState: FilterState = {
  asc: false,
  desc: false,
  moreThan100Posts: false,
  withoutPosts: false,
  searchFilter: '',
};
