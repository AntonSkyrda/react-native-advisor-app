import type {RegisterOptions} from 'react-hook-form';
import type {TFunction} from 'i18next';

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export const signUpDefaultValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]).{8,64}$/;

export function getNameRules(
  t: TFunction,
): RegisterOptions<SignUpFormValues, 'name'> {
  return {
    required: t('auth.nameRequired'),
    validate: value => value.trim().length > 0 || t('auth.nameRequired'),
  };
}

export function getEmailRules(
  t: TFunction,
): RegisterOptions<SignUpFormValues, 'email'> {
  return {
    required: t('auth.emailRequired'),
    pattern: {
      value: emailPattern,
      message: t('auth.emailInvalid'),
    },
  };
}

export function getPasswordRules(
  t: TFunction,
): RegisterOptions<SignUpFormValues, 'password'> {
  return {
    required: t('auth.passwordRequired'),
    minLength: {
      value: 8,
      message: t('auth.passwordSize'),
    },
    maxLength: {
      value: 64,
      message: t('auth.passwordSize'),
    },
    pattern: {
      value: passwordPattern,
      message: t('auth.passwordStrength'),
    },
  };
}
