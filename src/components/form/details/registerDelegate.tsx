import React, { useState, MouseEvent } from 'react';
import '../form.css';
import Input from '../input';
import { validateUsername } from '../validators';

interface FormProps {
  onSubmit: (tx: any) => void
}

interface Value {
  data: any;
  error: string;
}
const Form = ({ onSubmit }: FormProps) => {
  const [username, setUsername] = useState({data: "", error: ""});

  const onchange = (val: Value, name: string): void => {
    switch (name) {
      case 'username':
        setUsername(val);
        break;
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({ username });
  };

  return (
    <form>
      <Input
          type="text"
          label="username"
          value={username}
          validator={validateUsername}
          onChange={(val) => onchange(val, 'username')}
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
