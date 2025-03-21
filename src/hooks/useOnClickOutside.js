import { useEffect } from 'react';

export function useOnClickOutside(ref, handler, excludedRefs = []) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      
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