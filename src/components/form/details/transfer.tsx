import React, { useState, MouseEvent } from 'react';
import {
  validateAddress,
  validateAmount,
  validateData,
}  from '../validators';
import Input from '../input';
import '../form.css';

interface Value {
  data: any;
  error: string;
}

interface FormProps {
  onSubmit: (tx: any) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [recipientAddress, setRecipientAddress] = useState({ data: '', error: '' });
  const [amount, setAmount] = useState({ data: '', error: '' });
  const [data, setData] = useState({ data: '', error: '' });

  const onChange = (value: Value, name: string) => {
    switch (name) {
      case 'recipientAddress':
        setRecipientAddress(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      default:
        setData(value);
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      recipientAddress: recipientAddress.data,
      amount: amount.data,
      data: data.data,
    });
  };

  const hasError = Boolean(recipientAddress.error || amount.error || data.error);

  return (
    <form>
      <Input
        type="text"
        label="Recipient address"
        validator={validateAddress}
        value={recipientAddress}
        onChange={(val) => onChange(val, 'recipientAddress')}
      />
      <Input
        type="text"
        label="Amount"
        value={amount}
        validator={validateAmount}
        onChange={(val) => onChange(val, 'amount')}
      />
      <Input
        type="text"
        label="Message"
        value={data}
        validator={validateData}
        onChange={(val) => onChange(val, 'data')}
      />
      <fieldset className="has-text-right">
        <button
          className="is-primary"
          onClick={onClick}
          disabled={hasError}
        >
          Create
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
