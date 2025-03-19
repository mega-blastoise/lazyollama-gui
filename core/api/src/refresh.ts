import { scheduleJob, RecurrenceRule, Range } from 'node-schedule';
import { Ollama as LazyOllama } from '@lazyollama-gui/typescript-clients';

import logger from './log';

export default function refreshOllama() {
  const refresh = scheduleJob('LazyOllama:recurringIndexUpdate', fiveMinuteRule(), async () => {
    const ollama = LazyOllama.getInstance();
    try {
      logger.info('Refreshing Ollama index');
      await ollama.updateInternalIndexes();
      logger.info('Finished refreshing Ollama index at %s', new Date());
    } catch (e) {
      logger.error(e);
      logger.error('Error refreshing Ollama index');
    }
  });

  process.on('SIGINT', () => {
    refresh.cancel(false);
  });
}

function fiveMinuteRule() {
  const rule = new RecurrenceRule();
  rule.minute = new Range(0, 55, 5);
  return rule;
}
