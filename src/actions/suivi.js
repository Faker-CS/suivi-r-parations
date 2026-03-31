import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const enableServer = true;

const SUIVI_ENDPOINT = endpoints.suivi;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetSuivi(hash) {
  const shouldFetch = !!hash;

  const { data, isLoading, error, isValidating } = useSWR(
    shouldFetch ? [SUIVI_ENDPOINT, hash] : null,
    ([url, hashValue]) => axios.post(url, { hash: hashValue }).then((res) => res.data),
    swrOptions
  );

  const memoized = useMemo(
    () => ({
      suivi: (data && (data.data ?? data)) || [],
      suiviLoading: isLoading,
      suiviError: error,
      suiviValidating: isValidating,
      suiviEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoized;
}
