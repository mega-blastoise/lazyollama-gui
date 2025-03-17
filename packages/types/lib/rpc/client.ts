import { type RPCAPISpec } from './index';

export interface IRPCClient {
    call(method: string, ...params: any[]): Promise<any>;
    method(method: string): (params: any[]) => Promise<any>;
}

export interface ITypedRPCClient<T extends RPCAPISpec> {
    call<M extends keyof T>(method: M, ...params: T[M]['params']): Promise<T[M]['result']>
    method<M extends keyof T>(method: M): (params: T[M]['params']) => Promise<T[M]['result']>;
}