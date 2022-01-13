import React, { ChangeEvent } from 'react';
import {
  validatePublicKey,
  validateFee,
  validateNonce,
}  from './validators';
import Input from './input';
import './form.css';

interface Value {
  data: any;
  error: string;
}

interface BasicProps {
  senderPublicKey: { data: string, error: string };
  nonce: { data: number, error: string };
  fee: { data: number, error: string };
}

interface BasicsProps {
  setBasics: (data: BasicProps) => void;
  basics: BasicProps;
}

const Basics = ({ setBasics, basics }: BasicsProps) => {
  const onChange = (value: Value, name: string) => {
    switch (name) {
      case 'senderPublicKey':
        setBasics({
          senderPublicKey: value,
          nonce: basics.nonce,
          fee: basics.fee,
        });
        break;
      case 'nonce':
        setBasics({
          senderPublicKey: basics.senderPublicKey,
          nonce: { data: Number(value.data), error: value.error },
          fee: basics.fee,
        });
        break;
      default:
        setBasics({
          senderPublicKey: basics.senderPublicKey,
          nonce: basics.nonce,
          fee: { data: Number(value.data), error: value.error }
        });
    }
  };

  return (
    <form>
      <Input
        type="text"
        label="Sender public key"
        validator={validatePublicKey}
        value={basics.senderPublicKey}
        onChange={(val) => onChange(val, 'senderPublicKey')}
      />
      <Input
        type="text"
        label="Nonce"
        validator={validateNonce}
        value={basics.nonce}
        onChange={(val) => onChange(val, 'nonce')}
      />
      <Input
        type="text"
        label="Fee"
        validator={validateFee}
        value={basics.fee}
        onChange={(val) => onChange(val, 'fee')}
      />
    </form>
  );
}

export default Basics;
