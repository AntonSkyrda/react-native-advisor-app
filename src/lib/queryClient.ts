import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

import {
  MUTATION_RETRY_COUNT,
  QUERY_CACHE_GC_TIME_MS,
  QUERY_CACHE_STALE_TIME_MS,
  QUERY_PERSIST_MAX_AGE_MS,
  QUERY_RETRY_COUNT,
} from '../config/queryConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: QUERY_CACHE_GC_TIME_MS,
      networkMode: 'offlineFirst',
      refetchOnMount: false,
      staleTime: QUERY_CACHE_STALE_TIME_MS,
      retry: QUERY_RETRY_COUNT,
    },
    mutations: {
      networkMode: 'online',
      retry: MUTATION_RETRY_COUNT,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 1000,
});

export const queryPersistOptions = {
  maxAge: QUERY_PERSIST_MAX_AGE_MS,
  persister: asyncStoragePersister,
};
