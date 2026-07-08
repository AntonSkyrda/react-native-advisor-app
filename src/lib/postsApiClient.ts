import axios from 'axios';

import {API_POSTS_URL} from '../config/apiConfig';

export const postsApiClient = axios.create({
  baseURL: API_POSTS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
