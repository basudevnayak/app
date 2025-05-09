// utils/logger.ts

const ENABLE_LOGGING = true; // 🔁 Change this to false to disable all logs

export const Logger = {
  log: (...args: any[]) => {
    if (ENABLE_LOGGING) {
      console.log('[LOG]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (ENABLE_LOGGING) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (ENABLE_LOGGING) {
      console.error('[ERROR]', ...args);
    }
  },
};
