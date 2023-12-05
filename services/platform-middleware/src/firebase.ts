import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { assert } from 'console';

export function bootstrapFirebase() {
  assert(process.env.FIREBASE_TENANT_ID, 'Missing FIREBASE_TENANT_ID');

  const serviceAccount = JSON.parse(
    Buffer.from(
      process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON || '',
      'base64',
    ).toString(),
  );

  const webappConfig = JSON.parse(
    Buffer.from(
      process.env.FIREBASE_WEBAPP_CONFIG_JSON || '',
      'base64',
    ).toString(),
  );

  const config = {
    ...webappConfig,
    tenantId: process.env.FIREBASE_TENANT_ID,
    credential: credential.cert(serviceAccount),
  };

  const app = initializeApp(config);

  const auth = getAuth(app);

  auth.tenantManager().authForTenant(process.env.FIREBASE_TENANT_ID || '');
  auth.tenantManager().updateTenant(process.env.FIREBASE_TENANT_ID || '', {
    emailSignInConfig: {
      enabled: true,
    },
  });
}
