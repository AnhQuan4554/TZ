import axios from 'axios';
import type { ISite, IFindResult } from '@tymlez/platform-api-interfaces';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/FirebaseContext';

async function fetchSites(): Promise<IFindResult<ISite>> {
  try {
    const { data } = await axios.get<IFindResult<ISite>>(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/sites`
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export function useSites() {
  const [currentSite, setSite] = useState<ISite>();
  const { isAuthenticated, user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSites();
      if (data) {
        setSite(data.data[0]);
      }
    };
    if (isAuthenticated && user && (user.emailVerified || user.provider !== 'password')) {
      fetchData();
    }
  }, [isAuthenticated, user]);

  return {
    currentSite,
  };
}
