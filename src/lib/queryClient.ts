import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

import {
  MUTATION_RETRY_COUNT,
  QUERY_CACHE_GC_TIME_MS,
  QUERY_RETRY_COUNT,
} from '../config/queryConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: QUERY_CACHE_GC_TIME_MS,
      retry: QUERY_RETRY_COUNT,
    },
    mutations: {
      retry: MUTATION_RETRY_COUNT,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
