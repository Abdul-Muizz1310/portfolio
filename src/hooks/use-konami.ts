"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function useKonami() {
  const [isActive, setIsActive] = useState(false);
  const inputBuffer = useRef<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const deactivate = useCallback(() => setIsActive(false), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Use e.code for letter keys (KeyB, KeyA) and e.key for arrows
      const key = e.code.startsWith("Key") ? e.code : e.key;

      // Reset timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      inputBuffer.current.push(key);

      // Check if the buffer matches the sequence so far
      const bufferLen = inputBuffer.current.length;
      const expected = KONAMI_SEQUENCE.slice(0, bufferLen);
      const matches = inputBuffer.current.every(
        (k, i) => k === expected[i]
      );

      if (!matches) {
        // Wrong key — reset
        inputBuffer.current = [];
        return;
      }

      if (bufferLen === KONAMI_SEQUENCE.length) {
        // Full sequence matched
        inputBuffer.current = [];
        setIsActive(true);
        return;
      }

      // Set timeout to reset after 2 seconds of inactivity
      timeoutRef.current = setTimeout(() => {
        inputBuffer.current = [];
      }, 2000);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isActive, deactivate };
}
