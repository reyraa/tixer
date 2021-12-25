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
      <input placeholder='publicKey' value={publicKey} onChange={(e) => onchange(e, 'publicKey')} />
      <input placeholder='amount' value={amount} onChange={(e) => onchange(e, 'amount')}  />
      <button onClick={onClick}>Create</button>
    </form>
  );
}

export default Form;
