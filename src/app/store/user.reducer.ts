import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { getCurrentBalance } from './user.action';
import { UserState } from '../store/user.state';
export const initialState: User = {
  userId: 0,
  currentBalance: 0,
};

const _userReducer = createReducer(
  initialState,

  on(getCurrentBalance, (state, { user }) => {
    return user;
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
