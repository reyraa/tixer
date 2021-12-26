import React, { ChangeEvent } from 'react';
import './form.css';

interface BasicProps {
  senderPublicKey: string;
  nonce: number;
  fee: number;
}

interface SenderProps {
  setBasics: (data: BasicProps) => void;
  basics: BasicProps;
}

const Sender = ({ setBasics, basics }: SenderProps) => {
  const onchange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case 'senderPublicKey':
        setBasics({
          senderPublicKey: e.target.value,
          nonce: basics.nonce,
          fee: basics.fee,
        });
        break;
      case 'nonce':
        setBasics({
          senderPublicKey: basics.senderPublicKey,
          nonce: Number(e.target.value),
          fee: basics.fee,
        });
        break;
      default:
        setBasics({
          senderPublicKey: basics.senderPublicKey,
          nonce: basics.nonce,
          fee: Number(e.target.value),
        });
    }
  };

  return (
    <form className='form'>
      <label>Sender public key</label>
      <input placeholder='senderPublicKey' value={basics.senderPublicKey} onChange={(e) => onchange(e, 'senderPublicKey')} />
      <label>Nonce</label>
      <input placeholder='nonce' type="number" value={basics.nonce} onChange={(e) => onchange(e, 'nonce')}  />
      <label>Fee</label>
      <input placeholder='fee' type="number" value={basics.fee} onChange={(e) => onchange(e, 'fee')}  />
    </form>
  );
}

export default Sender;
