let worker: Worker | null = null;

export function postMessageToWorker<
  T extends { type: string; data: Data },
  Data extends Record<string, any> = {}
>(message: T) {
  if (worker) {
    worker.postMessage(message);
    return true;
  }

  return false;
}

export function getWorker() {
  return worker;
}

export function initializeWorker() {
  if (typeof window !== 'undefined' && 'Worker' in window) {
    worker = new window.Worker('worker.js');
    worker.postMessage({ type: 'INIT', data: {} });
  }
}
