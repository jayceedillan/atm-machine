import { createSelector } from '@ngrx/store';
import { User } from '../models/user.model';

import { UserState } from './user.state';

export const userSelector = (state: UserState) => state.user;

export const userCurrentBalance = createSelector(userSelector, (user: User) => {
  return user;
});
