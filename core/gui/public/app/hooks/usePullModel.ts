import React from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import rpc from '../lib/api/rpc-client';

const method = rpc.model.pull.method;

export default function usePullModel(
  model: string,
  options: Omit<UseMutationOptions, 'mutationFn' | 'mutationKey'> = {}
) {
  return useMutation({
    mutationKey: [method, model],
    mutationFn: () => rpc.model.pull.fn([model]),
    ...options
  });
}