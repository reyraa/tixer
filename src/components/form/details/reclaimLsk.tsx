import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [publicKey, setPublicKey] = useState('');
  const [amount, setAmount] = useState('');

  const onchange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case 'publicKey':
        setPublicKey(e.target.value);
        break;
      case 'amount':
        setAmount(e.target.value);
        break;
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      publicKey, amount,
    });
  };

  return (
    <form>
      <label>Public key</label>
      <input
        placeholder="publicKey"
        value={publicKey}
        onChange={(e) => onchange(e, 'publicKey')}
      />
      <label>Amount</label>
      <input
        placeholder="amount"
        value={amount}
        onChange={(e) => onchange(e, 'amount')}
      />
      <fieldset className="has-text-right">
        <button
          className="button is-primary"
          onClick={onClick}
        >
          Create
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
