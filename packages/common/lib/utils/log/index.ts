import debug from 'debug';
import chalk from 'chalk';
import { emojify } from 'node-emoji';

type XDebugger = debug.Debugger & {
  textOptions?: Record<string, boolean>;
  setTextOptions(options?: Record<string, boolean>): void;
};

type Level = 'info' | 'debug' | 'warn' | 'error';

export function createLogger($namespace: string) {
  let loggers: Record<Level, debug.Debugger> = {} as Record<Level, debug.Debugger>;
  for (const level of ['debug', 'info', 'warn', 'error'] as const) {
    loggers[level] = debug(`${$namespace}:${level}`);
  }

  const proxies: Record<Level, XDebugger> = {} as Record<Level, XDebugger>;
  for (const level of Object.keys(loggers)) {
    Object.defineProperty(proxies, level, {
      enumerable: true,
      writable: false,
      value: new Proxy(loggers[level as Level], {
        apply: (target, thisArg, argArray) => {
          /** Decode emoji strings in arg array */
          const emojifiedArgArray = argArray.map((arg) => {
            if (typeof arg === 'string') {
              /** Modify text string with chalk options */
              if (thisArg && (typeof thisArg === 'function' || typeof thisArg === 'object')) {
                if (Object.hasOwn(thisArg, 'textOptions')) {
                  const textOptions = thisArg?.textOptions || {};
                  for (const key of Object.keys(textOptions)) {
                    if (textOptions[key] && Object.hasOwn(chalk, key)) {
                      const chalkModififier = (chalk as any)[key];
                      if (chalkModififier && typeof chalkModififier === 'function') {
                        arg = chalkModififier(arg);
                      }
                    }
                  }
                }
              }
              return emojify(arg);
            }

            return arg;
          });

          return target.apply(thisArg, emojifiedArgArray as any);
        }
      })
    });

    Object.defineProperty(proxies[level as Level], `setTextOptions`, {
      value: (options: Record<string, boolean>) => {
        Object.defineProperty(proxies[level as Level], `textOptions`, {
          value: options,
          writable: true,
          enumerable: true
        });
      }
    });
  }

  return proxies;
}
