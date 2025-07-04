import { useEffect } from 'react';

export default function VIP() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/VIP.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>VIP Panel loading...</div>;
}
