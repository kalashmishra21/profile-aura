export const logger = {
  info: (msg: string) => console.log(`\x1b[36m[PROFILE-AURA INFO]\x1b[0m ${msg}`),
  success: (msg: string) => console.log(`\x1b[32m[PROFILE-AURA SUCCESS]\x1b[0m ${msg}`),
  warn: (msg: string) => console.warn(`\x1b[33m[PROFILE-AURA WARN]\x1b[0m ${msg}`),
  error: (msg: string) => console.error(`\x1b[31m[PROFILE-AURA ERROR]\x1b[0m ${msg}`)
};
