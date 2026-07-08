import type {RegisterOptions} from 'react-hook-form';
import type {TFunction} from 'i18next';

export type LoginFormValues = {
  password: string;
  username: string;
};

export const loginDefaultValues: LoginFormValues = {
  password: '',
  username: '',
};

export function getUsernameRules(
  t: TFunction,
): RegisterOptions<LoginFormValues, 'username'> {
  return {
    required: t('auth.emailRequired'),
    validate: value => value.trim().length > 0 || t('auth.emailRequired'),
  };
}

export function getLoginPasswordRules(
  t: TFunction,
): RegisterOptions<LoginFormValues, 'password'> {
  return {
    required: t('auth.passwordRequired'),
  };
}
