type MinimalLogger = {
  [logfn in Level]: (typeof console)[logfn];
};

type Level = 'info' | 'debug' | 'warn' | 'error';

export { type Level, type MinimalLogger };
