import React from 'react';

// TODO (Nick) type subfields better

export interface RootFiberNode {
  render(Component: React.ReactNode): void;
  unmount(): void;
  _internalRoot: InternalRootNode;
}

export type InternalRootNode = Partial<{
  callbackNode: any;
  callbackPriority: number;
  cancelPendingCommit: any;
  containerInfo: HTMLElement;
  context: Record<any, any>;
  current: ReactFiberNode;
  entangledLanes: number;
  entanglements: number[];
  errorRecoveryDisabledLanes: number;
  expirationTimes: number[];
  expiredLanes: number;
  finishedLanes: number;
  finishedWork: any;
  formState: any;
  hiddenUpdates: number[];
  identifierPrefix: string;
  incompleteTransitions: Map<any, any>;
  next: any;
  onCaughtError: Function;
  onRecoverableError: Function;
  onUncaughtError: Function;
  pendingChildren: any;
  pendingContext: any;
  pendingLanes: number;
  pingCache: any;
  pingedLanes: number;
  pooledCache: any;
  pooledCacheLanes: number;
  shellSuspendCounter: number;
  suspendedLanes: number;
  tag: number;
  timeoutHandle: number;
  warmLanes: number;
}>;

type ReactFiberNode<Props = {} | null> = {
  alternate: ReactFiberNode;
  child: ReactFiberNode | null;
  childLanes: number;
  deletions: any | null;
  dependencies: any | null;
  elementType: string | Object | null;
  flags: number;
  index: number;
  key: string | null;
  lanes: number;
  memoizedProps: Props;
  memoizedState: {
    cache: {
      controller: AbortController | null;
      data: Map<any, any>;
      refCount: number;
    };
    element: {
      type: {};
      key: string | null;
      ref: {} | null;
      props: any;
      $$typeof: Symbol | string;
    };
  };
  mode: number;
  pendingProps?: any | null;
  ref: any;
  refCleanup: any;
  return: any;
  sibling: any;
  stateNode: any;
  subtreeFlags: number;
  tag: number;
  type: any;
  updateQueue: any;
};
