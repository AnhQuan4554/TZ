import type { ISite } from '@tymlez/platform-api-interfaces';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useSites } from '../hooks/sites/useSites';

export interface SiteContextValue {
  currentSite: ISite | undefined;
  timezone: string | undefined;
}
interface SiteProviderProps {
  children: ReactNode;
}

export const SiteContext = createContext<SiteContextValue>({
  currentSite: undefined,
  timezone: undefined,
});

// Export Provider.
export const SiteProvider: FC<SiteProviderProps> = (props) => {
  const { children } = props;
  const { currentSite } = useSites();

  const timezone = currentSite?.timezone;
  const data = useMemo(() => ({ currentSite, timezone }), [currentSite, timezone]);
  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
};

// Export useContext Hook.
export function useSiteContext() {
  return useContext(SiteContext);
}
