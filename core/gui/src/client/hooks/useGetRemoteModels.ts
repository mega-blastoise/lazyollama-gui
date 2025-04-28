import React from 'react';
import { useQuery } from '@tanstack/react-query';
import rpc from '../lib/api/rpc-client';

const method = rpc.models.remote.method;

export default function useGetRemoteModels() {
  return useQuery({
    queryKey: [method],
    queryFn: () => rpc.models.remote.fn([])
  });
}
