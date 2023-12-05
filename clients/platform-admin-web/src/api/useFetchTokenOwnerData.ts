import axios from 'axios';
import type { ITokenOwner } from '@tymlez/platform-api-interfaces';

export async function fetchTokenOwnerData(): Promise<ITokenOwner | null> {
  const { data } = await axios.get<ITokenOwner>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/token-owner`,
  );
  return data;
}
