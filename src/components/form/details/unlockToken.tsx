import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';
import Input from '../input';
import { validateAmount } from '../validators';

interface FormProps {
  onSubmit: (tx: any) => void
}

interface Value {
  data: any;
  error: string;
}

const Form = ({ onSubmit }: FormProps) => {
  const [amount, setAmount] = useState({data: "",error: ''});

  const onchange = (val: Value, name: string) => {
    switch (name) {
      case 'amount':
        setAmount(val);
        break;
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      amount,
    });
  };

  return (
    <form>
      <Input
          type="text"
          label="amount"
          value={amount}
          validator={validateAmount}
          onChange={(val) => onchange(val, 'amount')}
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
