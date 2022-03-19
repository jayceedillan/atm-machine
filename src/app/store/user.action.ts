import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const getCurrentBalance = createAction(
  '[Transaction RETRIEVED] TRANSACTION API Success',
  props<{ user: User }>()
);
