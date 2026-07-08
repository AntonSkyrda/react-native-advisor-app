import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import {
  API_AUTH_URL,
  AUTH_REFRESH_ENDPOINT,
  AUTH_TOKEN_EXPIRES_IN_MINS,
} from '../config/apiConfig';
import {
  getAuthSession,
  saveAuthTokens,
} from '../features/auth/storage/secureAuthStorage';
import type {RefreshResponse} from '../features/auth/types/authTypes';

export const apiClient = axios.create({
  baseURL: API_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const session = await getAuthSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

createAuthRefreshInterceptor(apiClient, async failedRequest => {
  const session = await getAuthSession();

  if (!session?.refreshToken) {
    return Promise.reject(failedRequest);
  }

  const {data} = await axios.post<RefreshResponse>(
    `${API_AUTH_URL}${AUTH_REFRESH_ENDPOINT}`,
    {
      refreshToken: session.refreshToken,
      expiresInMins: AUTH_TOKEN_EXPIRES_IN_MINS,
    },
    {
      headers: {'Content-Type': 'application/json'},
    },
  );

  await saveAuthTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;
});
