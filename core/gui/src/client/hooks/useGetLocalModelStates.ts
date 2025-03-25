import React from 'react';
import { useQuery } from '@tanstack/react-query';

import rpc from '../lib/api/rpc-client';

const method = rpc.models.local.method;

export default function useGetLocalModelStates() {
  return useQuery({
    queryKey: [method],
    queryFn: () => rpc.models.local.fn([])
  });
}
