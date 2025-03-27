import React from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import rpc from '../lib/api/rpc-client';

const method = rpc.model.start.method;

export default function useStartModel(
  model: string,
  options: Omit<UseMutationOptions, 'mutationFn' | 'mutationKey'> = {}
) {
  return useMutation({
    mutationKey: [method, model],
    mutationFn: () => rpc.model.start.fn([model]),
    ...options
  });
}
