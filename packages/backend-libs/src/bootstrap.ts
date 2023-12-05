/* eslint-disable no-process-env */

import Vault from 'node-vault';
import { config } from 'dotenv';

export async function bootstrapEnvironment() {
  config();
  const {
    VAULT_ADDR,
    VAULT_TOKEN,
    VAULT_NAMESPACE,
    ENV,
    VAULT_PATH = 'kvv2',
    VAULT_KEY,
    VAULT_VAR_PATH = `variables/${process.env.CLIENT_NAME}/local/all-variables`,
  } = process.env;

  if (VAULT_ADDR && VAULT_TOKEN) {
    const vault = Vault({
      endpoint: VAULT_ADDR,
      token: VAULT_TOKEN,
      namespace: VAULT_NAMESPACE,
    });
    const vaultPath = `${VAULT_PATH}/data/${VAULT_VAR_PATH}`;

    if (VAULT_KEY) {
      console.log('make sure vault is unsealed');
      // const status = await vault.health();
      // console.log('status', JSON.stringify(status, null, 4));
      await vault.unseal({ secret_shares: 1, key: VAULT_KEY });
    }

    if (ENV === 'local') {
      console.log('setup local environment');
      // Auto populate all variables from environment to vaults

      console.log('get mounts settings');
      const secrets = await vault.mounts({});
      if (!secrets.data[`${VAULT_PATH}/`]) {
        console.log('enable engines kv2 for ', VAULT_PATH);

        await vault.mount({
          mount_point: VAULT_PATH,
          description: 'local environment variables',
          type: 'kv',
          config: {},
          options: { version: 2 },
          generate_signing_key: true,
          id: 'kvv2',
        });
      }

      console.log('Update vault data with current .env data', vaultPath);

      await vault.write(vaultPath, {
        data: process.env,
      });
    }
    console.log(
      'Initializing environment with vauls from : URL =%s, namespace = %s',
      VAULT_ADDR,
      VAULT_NAMESPACE,
    );
    const variables = (await vault.read(vaultPath)).data.data;

    Object.assign(process.env, { ...variables, INJECTED_FROM_VAULT: true });
    console.log('Inbjected variables : Keys = ', Object.keys(variables));
  } else {
    console.log(
      'Skip variables loading because missing VAULT_ADDR and VAULT_TOKEN',
    );
  }
}

// (async () => {
//   await bootstrapEnvironment();

// })().catch((err) => console.log(err));
