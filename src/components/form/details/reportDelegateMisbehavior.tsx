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
    <form>
      <label>
        <input
          type="text"
          placeholder="recipient"
          value={recipient}
          onChange={(e) => onchange(e, 'recipient')}
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
          value={message}
          onChange={(e) => onchange(e, 'message')}
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
