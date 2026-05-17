import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameCore from '../hooks/useGameCore';

describe('useGameCore — pvc CPU move', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('CPU makes a move after 800ms delay on its turn', () => {
    const { result } = renderHook(() => useGameCore('pvc', 'Hard', vi.fn()));

    act(() => result.current.handleMove(0)); // X plays — now O's (CPU) turn
    expect(result.current.squares.filter(Boolean)).toHaveLength(1);

    act(() => vi.advanceTimersByTime(800));
    expect(result.current.squares.filter(Boolean)).toHaveLength(2);
  });

  it('CPU does not move while it is X turn', () => {
    const { result } = renderHook(() => useGameCore('pvc', 'Hard', vi.fn()));
    // Initially isXNext=true → no CPU timer should fire
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.squares.filter(Boolean)).toHaveLength(0);
  });

  it('CPU uses random move on Easy difficulty', () => {
    const { result } = renderHook(() => useGameCore('pvc', 'Easy', vi.fn()));
    act(() => result.current.handleMove(4)); // X plays center
    act(() => vi.advanceTimersByTime(800));
    // CPU should have placed somewhere
    expect(result.current.squares.filter(Boolean)).toHaveLength(2);
  });
});
