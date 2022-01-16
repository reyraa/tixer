import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';
import Input from "../input";
import { validateAmount, validatePublicKey } from '../validators';

interface FormProps {
  onSubmit: (tx: any) => void
}

interface Value {
  data: any;
  error: string;
}

const Form = ({ onSubmit }: FormProps) => {
  const [publicKey, setPublicKey] = useState({ data: '', error: '' });
  const [amount, setAmount] = useState({data: "", error: ""});

  const onChange = (value: Value, name: string) => {
    switch (name) {
      case 'publicKey':
        setPublicKey(value);
        break;
      case 'amount':
        setAmount(value);
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
      <Input 
         type="text"
         label='publickey'
         value={publicKey}
         validator={validatePublicKey} 
         onChange={(val) => onChange(val, 'publicKey')}
         />
       <Input
        type="text"
        label="Amount"
        value={amount}
        validator={validateAmount}
        onChange={(val) => onChange(val, 'amount')}
      />
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
