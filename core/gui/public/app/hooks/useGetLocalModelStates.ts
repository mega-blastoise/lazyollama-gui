import React from 'react';
import { useQuery } from '@tanstack/react-query';

const method = 'showModelStates';

async function fetchLocalModelStates() {
  const proxyPath = process.env.LAZYOLLAMA_API_PROXY_URL;

  if (proxyPath == null) {
    throw new Error('LAZYOLLAMA_API_PROXY_URL is not defined');
  }

  const url = new URL(proxyPath);

  const response = await Bun.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Request-ID': Date.now().toString(),
      'X-Client-Request-ID': 'lazyollama-gui'
    },
    body: JSON.stringify({
      method,
      params: []
    })
  });
  const data = await response.json();
  return data;
}

export default function useGetLocalModelStates() {
  return useQuery({
    queryKey: [method],
    queryFn: fetchLocalModelStates
  });
}
