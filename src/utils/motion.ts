/**
 * Disable enter animations during SSR/prerender so the static HTML
 * is fully visible to crawlers and no-JS readers.
 */
export function motionInitial<T extends object | boolean>(animation: T): T | false {
  return import.meta.env.SSR ? false : animation;
}
