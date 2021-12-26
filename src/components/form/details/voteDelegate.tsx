import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

interface Vote {
  delegateAddress: string;
  amount: number;
}

const emptyVote: Vote = {
  delegateAddress: '',
  amount: 0,
};

const Form = ({ onSubmit }: FormProps) => {
  const [votes, setVotes] = useState<Vote[]>([]);

  const onchange = (e: ChangeEvent<HTMLInputElement>, index: number, name: string) => {
    const newVotes: Vote[] = votes.map((vote, i) => {
      if (index === i) {
        return {
          delegateAddress: name === 'delegateAddress' ? e.target.value : vote.delegateAddress,
          amount: name === 'amount' ? Number(e.target.value) : vote.amount,
        }
      }
      return vote;
    });
    setVotes(newVotes);
  };

  const submit = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      votes,
    });
  };

  const add = (e: MouseEvent) => {
    e.preventDefault();
    setVotes([
      ...votes,
      emptyVote,
    ]);
  };

  const remove = (e: MouseEvent, index: number) => {
    e.preventDefault();
    const newVotes: Vote[] = votes.filter((_, i) => (i !== index));
    setVotes(newVotes);
  };


  return (
    <form className='form'>
      {
        votes.map((vote, index) => (
          <fieldset>
            <label>Delegate address</label>
            <input
              placeholder='delegateAddress'
              value={vote.delegateAddress}
              onChange={(e) => onchange(e, index, 'delegateAddress')}
            />
            <label>Amount</label>
            <input
              placeholder='amount'
              value={vote.amount}
              onChange={(e) => onchange(e, index, 'amount')}
            />
            <button
              onClick={(e) => remove(e, index)}
            >
              Remove
            </button>
          </fieldset>
        ))
      }
      <button onClick={add}>Add</button>
      <button onClick={submit}>Create</button>
    </form>
  );
}

export default Form;
