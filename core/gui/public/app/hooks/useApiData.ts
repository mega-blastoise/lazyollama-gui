import React from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchApiData() {
    const url = new URL(process.env.LAZYOLLAMA_API_URL!);
    const response = await Bun.fetch(url, {
        method: 'POST',
        headers: getAppNetworkHeaders(),
        body: {}
    });
    const data = await response.json();
    return data;
}

export default function useApiData() {
    return useQuery({
        queryKey: ['api-state'],
        queryFn: fetchApiData
    });
}