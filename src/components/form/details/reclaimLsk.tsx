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
    <form className='form'>
      <label>Public key</label>
      <input placeholder='publicKey' value={publicKey} onChange={(e) => onchange(e, 'publicKey')} />
      <label>Amount</label>
      <input placeholder='amount' value={amount} onChange={(e) => onchange(e, 'amount')}  />
      <button onClick={onClick}>Create</button>
    </form>
  );
}

export default Form;
