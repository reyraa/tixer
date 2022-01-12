type Validator = (value: any, info?: any) => string;

export const validateAddress: Validator = (value) => {
  return '';
};

export const validatePublicKey: Validator = (value) => {
  return '';
};

export const validateFee: Validator = (value) => {
  return '';
};

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

