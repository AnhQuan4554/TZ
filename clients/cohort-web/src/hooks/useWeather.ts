import { useState, useEffect } from 'react';
import axios from 'axios';
import type { IWeatherData } from '@tymlez/platform-api-interfaces';
import { useSiteContext } from '@tymlez/frontend-libs';

export const useWeather = (): {
  data: IWeatherData | null;
  loading: boolean;
} => {
  const [data, setData] = useState<IWeatherData | null>(null);
  // const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentSite } = useSiteContext();
  const siteId = currentSite?.id;

  useEffect(() => {
    async function fetchData() {
      if (siteId !== undefined) {
        const weatherData: any = await axios.get<IWeatherData>(
          `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/sites/${siteId}/weather`,
        );

        setData(weatherData.data);
        // setList(fetchedData);
        setLoading(false);
      }
    }
    fetchData();
  }, [siteId]);
  return {
    data,
    loading,
  };
};
