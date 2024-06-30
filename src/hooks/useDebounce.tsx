'use client';
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number, callback?: (debouncedValue: T) => void | Promise<void>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) {
        void (async () => {
          try {
            await callback(value);
          } catch (error) {
            console.error('Error in callback:', error);
          }
        })();
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);

  return debouncedValue;
}

export default useDebounce;
