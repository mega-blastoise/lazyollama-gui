import { type RPCClientConfig, createRPCClient } from '@lazyollama-gui/typescript-rpc-core/client';
import { type IOllamaRPCAPI } from '@lazyollama-gui/typescript-common-types';

export default function createOllamaRPCClient(options: RPCClientConfig): ReturnType<typeof createRPCClient<IOllamaRPCAPI>> {
    return createRPCClient<IOllamaRPCAPI>(options);
}

export {
    type RPCClientConfig
}