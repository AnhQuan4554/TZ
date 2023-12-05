import { Encryption } from '@tymlez/backend-libs';

const handler = ({
  password,
  iv,
  secret,
}: {
  password: string;
  iv: string;
  secret?: string;
}) => {
  const decryptedText = Encryption.decrypted(password, iv, secret);
  console.log("Your decrypted content: '%s'", decryptedText);
};
const command = 'decrypt [password] [iv]';
const desc = 'deploy CLI';
const builder = {
  password: {
    allias: ['p'],
    required: true,
    type: 'string',
    description: 'The encrypted password hash',
  },
  iv: {
    allias: ['iv'],
    required: true,
    type: 'string',
    description: 'The IV output of original password encryption',
  },
  secret: {
    allias: ['s'],
    required: false,
    type: 'string',
    description: 'The secret use to generate in original request',
  },
};
export { command, desc, builder, handler };
