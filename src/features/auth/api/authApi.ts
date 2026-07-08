import {AxiosError} from 'axios';

import {AUTH_TOKEN_EXPIRES_IN_MINS} from '../../../config/apiConfig';
import {apiClient} from '../../../lib/apiClient';
import type {AuthUser, LoginPayload} from '../types/authTypes';

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  try {
    const {data} = await apiClient.post<AuthUser>('/auth/login', {
      ...payload,
      expiresInMins: AUTH_TOKEN_EXPIRES_IN_MINS,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Unable to sign in');
    }

    throw error;
  }
}
