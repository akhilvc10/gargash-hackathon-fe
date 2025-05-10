"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Define callback function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    media.addEventListener("change", listener);
    
    // Clean up function
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
} 