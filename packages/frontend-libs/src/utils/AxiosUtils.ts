import axios from 'axios';
import Router from 'next/router';
import { ACCESS_TOKEN_KEY } from '../constants';

export function initAxiosAuth() {
  axios.interceptors.request.use((requestConfig: any) => {
    if (
      !requestConfig.disableAuthHeader &&
      (requestConfig.url?.startsWith(process.env.NEXT_PUBLIC_PLATFORM_API_URL) ||
        requestConfig.url?.startsWith(process.env.NEXT_PUBLIC_CLIENT_API_URL))
    ) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        requestConfig.headers = {
          ...requestConfig.headers,
          Authorization: `Bearer ${accessToken}`,
        } as any;
      }
    }

    return requestConfig;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const pathRoute = window.location.pathname;
      if (error.response.status === 401 && pathRoute !== '/authentication/login/') {
        document.location.href = '/authentication/login/';
      }

      if (error.response.status === 403 && pathRoute !== '/authentication/login/') {
        Router.push({
          pathname: '/403',
          query: {
            returnUrl: pathRoute,
          },
        });
      }
      return error;
    }
  );
}
