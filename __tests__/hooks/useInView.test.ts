import { renderHook } from '@testing-library/react';

import { useInView } from '@/hooks/useInView';

describe('useInView', () => {
  const originalIO = global.IntersectionObserver;

  beforeEach(() => {
    // Minimal mock so the hook mounts without browser IO
    global.IntersectionObserver = class {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
      constructor(_cb: IntersectionObserverCallback) {}
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIO;
  });

  it('returns ref and inView=false initially', () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.ref).toBeDefined();
    expect(result.current.inView).toBe(false);
  });
});
