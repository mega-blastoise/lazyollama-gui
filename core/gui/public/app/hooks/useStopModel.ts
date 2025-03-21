import React from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import rpc from '../lib/api/rpc-client';

const method = rpc.model.stop.method;

export default function useStopModel(
  model: string,
  options: Omit<UseMutationOptions, 'mutationFn' | 'mutationKey'> = {}
) {
  return useMutation({
    mutationKey: [method, model],
    mutationFn: () => rpc.model.stop.fn([model]),
    ...options
  });
}
