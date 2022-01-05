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
      <label>
        <input
          type="text"
          placeholder="recipient"
          value={recipientAddress}
          onChange={(e) => onchange(e, 'recipientAddress')}
        />
        <span>Recipient address</span>
      </label>
      <label>
        <input
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => onchange(e, 'amount')}
        />
        <span>Amount</span>
      </label>
      <label>
        <input
          type="text"
          placeholder="message"
          value={data}
          onChange={(e) => onchange(e, 'data')}
        />
        <span>Message</span>
      </label>
      <fieldset className="has-text-right">
        <button
          className="is-primary"
          onClick={onClick}
        >
          Create
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
