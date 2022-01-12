import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [username, setUsername] = useState('');

  const onchange = (e: ChangeEvent<HTMLInputElement>, name: string): void => {
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
      <label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => onchange(e, 'username')}
        />
        <span>Username</span>
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
