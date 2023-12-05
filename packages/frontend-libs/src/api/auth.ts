import axios from 'axios';
import type { IValidatedUser } from '@tymlez/platform-api-interfaces';

export async function getProfile(): Promise<IValidatedUser | undefined> {
  try {
    const { data } = await axios.get<IValidatedUser>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/profile`
    );
    return data;
  } catch (error) {
    // swallow error and return undefined
  }
  return undefined;
}
