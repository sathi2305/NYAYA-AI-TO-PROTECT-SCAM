import { useEffect, useState } from 'react';

export function useOnlineStatus() {
  const [isBrowserOnline, setIsBrowserOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [simulatedOffline, setSimulatedOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline: isBrowserOnline && !simulatedOffline,
    isBrowserOnline,
    simulatedOffline,
    setSimulatedOffline,
  };
}
