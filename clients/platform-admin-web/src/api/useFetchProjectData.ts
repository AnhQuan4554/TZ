import axios from 'axios';
import type { IProject } from '@tymlez/platform-api-interfaces';

export async function fetchProjectData(): Promise<IProject | null> {
  const { data } = await axios.get<IProject>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/project`,
  );
  return data;
}
