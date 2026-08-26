export type CursorMode = 'default' | 'hover' | 'view' | 'explore' | 'interact' | 'drag';

/** Utility helper function to trigger cursor mode changes from any component */
export function setCursorState(mode: CursorMode, text: string = '') {
  const event = new CustomEvent('set-cursor', {
    detail: { mode, text },
  });
  window.dispatchEvent(event);
}
