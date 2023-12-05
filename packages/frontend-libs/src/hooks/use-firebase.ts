import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

export function useFirebase() {
  const [auth, setAuth] = useState<any>(undefined);
  useEffect(() => {
    const createConfig = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/init`);
      const firebaseConfig = await data.json();
      const app = initializeApp(firebaseConfig);
      const createdApp = getAuth(app);
      createdApp.tenantId =
        firebaseConfig.tenantId || process.env.NEXT_PUBLIC_FIREBASE_TENANT_ID || 'tymlez-local';
      setAuth(createdApp);
    };

    if (!auth) {
      createConfig();
    }
  }, [auth, setAuth]);

  return { auth };
}
