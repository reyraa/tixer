import { validateBase32Address } from '@liskhq/lisk-cryptography';

type Validator = (value: any, info?: any) => string;

export const validateAddress: Validator = (value) => {
  try {
    return validateBase32Address(value) ? '' : 'The address is not valid';
  } catch (e) {
    return 'The address is not valid';
  }
};

export const validatePublicKey: Validator = (value) => {
  const reg = /^[0-9a-f]{64}$/;
  return reg.test(value) ? '' : 'The public key is not valid';
};

export const validateFee: Validator = (value) => {
  // number
  // less than cap
  return '';
};

export const validateUsername: Validator = (value) => {
  const reg = /^[a-z0-9!@$&_.]{3,20}$/;
  return reg.test(value) ? "" : 'Username is not valid'
}

export const validateAmount: Validator = (value) => {
  const hasError = Number(value) != value || Number(value) <= 0;
  return hasError ? 'Value must be a positive number' : '';
};

export const validateNonce: Validator = (value, info = 0) => {
  const hasError = parseInt(value) != value || value < info;
  return hasError ? `Nonce must be an integer greater than ${info - 1}` : '';
};

export const validateData: Validator = (value) => {
  const size = encodeURI(value).split(/%..|./).length - 1;
  return size > 64 ? 'Message must be smaller than 64 bytes' : '';
};
