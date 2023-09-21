import { useState, useEffect } from 'react';

export default function useScreenSize() {
  const isClient = typeof window === 'object';
  const [screenSize, setScreenSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0
  });

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  
  }, []);

  return screenSize;
}


