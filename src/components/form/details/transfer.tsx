import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');

  const onchange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case 'recipientAddress':
        setRecipientAddress(e.target.value);
        break;
      case 'amount':
        setAmount(e.target.value);
        break;
      default:
        setData(e.target.value);
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      recipientAddress, amount, data,
    });
  };

  return (
    <form className='form'>
      <input placeholder='recipient' value={recipientAddress} onChange={(e) => onchange(e, 'recipientAddress')} />
      <input placeholder='amount' value={amount} onChange={(e) => onchange(e, 'amount')}  />
      <input placeholder='message' value={data} onChange={(e) => onchange(e, 'data')}  />
      <button onClick={onClick}>Create</button>
    </form>
  );
}

export default Form;
