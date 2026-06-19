import { Pi } from '@pinetwork/sdk';

export const initPi = () => {
  if (typeof window !== 'undefined') {
    Pi.init({ version: '2.0', sandbox: true });
  }
};

export const loginPi = async () => {
  const scopes = ['username', 'payments'];
  try {
    const auth = await Pi.authenticate(scopes, (payment) => console.log(payment));
    return auth;
  } catch (err) {
    console.error(err);
  }
};
