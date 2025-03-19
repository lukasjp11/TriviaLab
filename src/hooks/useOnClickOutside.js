import { useEffect } from 'react';

/**
 * Hook for detecting clicks outside of the specified element
 * 
 * @param {React.RefObject} ref - React ref object for the element to monitor
 * @param {Function} handler - Callback function to run when a click outside is detected
 * @param {Array} excludedRefs - Optional array of refs to exclude from outside click detection
 */
export function useOnClickOutside(ref, handler, excludedRefs = []) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if the ref is not set or if clicking ref element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      
      // Check if the click was on any of the excluded elements
      const clickedOnExcludedElement = excludedRefs.some(
        (excludedRef) => 
          excludedRef.current && 
          excludedRef.current.contains(event.target)
      );
      
      if (clickedOnExcludedElement) {
        return;
      }
      
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludedRefs]);
}