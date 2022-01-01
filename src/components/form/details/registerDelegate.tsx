import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [username, setUsername] = useState('');

  const onchange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case 'username':
        setUsername(e.target.value);
        break;
    }
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({ username });
  };

  return (
    <form>
      <label>Username</label>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => onchange(e, 'username')}
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
