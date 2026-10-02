/**
 * True once React has hydrated this DOM node (it tags hydrated nodes with an internal `__reactFiber$…` key). DOM that is
 * mutated (classes, attributes) before its Suspense boundary hydrates triggers "attributes didn't match" hydration
 * warnings, so scripts that decorate server-rendered nodes should skip nodes until this is true and retry shortly after.
 */
export function isHydrated(el: Element): boolean {
  for (const k in el) if (k.startsWith("__reactFiber$")) return true;
  return false;
}
