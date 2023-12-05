import axios from 'axios';
import type { IRootAuthority } from '@tymlez/platform-api-interfaces';

export async function fetchRootAuthorityData(): Promise<IRootAuthority | null> {
  const { data } = await axios.get<IRootAuthority>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/root-authority`,
  );
  return data;
}
