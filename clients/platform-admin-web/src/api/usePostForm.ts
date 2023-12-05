import axios from 'axios';
import { useMutation } from 'react-query';
import { ACCESS_TOKEN_KEY } from '@tymlez/frontend-libs';

const validateStatus = (status: number) => {
  return status === 200 || status === 201 || status === 400 || status === 404; // default
};

export function formMultiple(endpoint: string, method: any, data: any) {
  return axios.request({
    method,
    url: `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/${endpoint}/${data.id}`,
    data,
    validateStatus,
  });
}

export function useForm<T>(endpoint: string, method = 'POST', id = '') {
  return useMutation<T>((data) => {
    return axios.request({
      method,
      url: `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/${endpoint}/${id}`,
      data,
      validateStatus,
    });
  });
}

export async function dataFiletoURL(postedFile: File) {
  return new Promise((resolve, error) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        name: postedFile.name,
        content: reader.result?.toString().split('base64,')[1],
      });
    };
    reader.onerror = () => {
      error();
    };
    reader.readAsDataURL(postedFile);
  });
}

export function publish(endpoint: string, id = '') {
  return axios.post(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/${endpoint}/${id}`,
    validateStatus,
  );
}

export function exportData(data: string[]) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  window.open(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/export?data=${data}&access_token=${accessToken}`,
  );
}
