import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

HTMLCanvasElement.prototype.getContext = (() => ({
  setTransform: () => undefined,
  clearRect: () => undefined,
  beginPath: () => undefined,
  arc: () => undefined,
  fill: () => undefined,
})) as never;

if (!window.crypto.randomUUID) {
  window.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000000";
}

window.requestAnimationFrame = (() => 1) as typeof window.requestAnimationFrame;
window.cancelAnimationFrame = (() => undefined) as typeof window.cancelAnimationFrame;
