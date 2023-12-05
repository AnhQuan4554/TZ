import type { IClient } from '@tymlez/platform-api-interfaces';

export function getDesireGuardianClient(client: IClient) {
  if (process.env.ENV !== 'local') {
    return client.name;
  }
  return process.env.DEBUG_GUARDIAN_CLIENT || client.name;
}
