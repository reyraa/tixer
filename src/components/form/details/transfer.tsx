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
    <form>
      <label>Recipient address</label>
      <input
        placeholder="recipient"
        value={recipientAddress}
        onChange={(e) => onchange(e, 'recipientAddress')}
      />
      <label>Amount</label>
      <input
        placeholder="amount"
        value={amount}
        onChange={(e) => onchange(e, 'amount')}
      />
      <label>Message</label>
      <input
        placeholder="message"
        value={data}
        onChange={(e) => onchange(e, 'data')}
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
