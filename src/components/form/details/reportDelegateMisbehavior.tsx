import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const onchange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case 'recipient':
        setRecipient(e.target.value);
        break;
      case 'amount':
        setAmount(e.target.value);
        break;
      default:
        setMessage(e.target.value);
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      recipient, amount, message,
    });
  };

  return (
    <form className='form'>
      <input placeholder='recipient' value={recipient} onChange={(e) => onchange(e, 'recipient')} />
      <input placeholder='amount' value={amount} onChange={(e) => onchange(e, 'amount')}  />
      <input placeholder='message' value={message} onChange={(e) => onchange(e, 'message')}  />
      <button onClick={onClick}>Create</button>
    </form>
  );
}

export default Form;
