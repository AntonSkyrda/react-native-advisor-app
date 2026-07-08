import type {RegisterOptions} from 'react-hook-form';

export type LoginFormValues = {
  password: string;
  username: string;
};

export const loginDefaultValues: LoginFormValues = {
  password: '',
  username: '',
};

export const usernameRules: RegisterOptions<LoginFormValues, 'username'> = {
  required: 'Username is required',
  validate: value => value.trim().length > 0 || 'Username is required',
};

export const loginPasswordRules: RegisterOptions<LoginFormValues, 'password'> =
  {
    required: 'Password is required',
  };
