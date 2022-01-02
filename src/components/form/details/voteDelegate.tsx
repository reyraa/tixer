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
    <form>
      {
        votes.map((vote, index) => (
          <fieldset className="message is-info member" key={index}>
            <div className="message-body">
              <div className="columns">
                <label className="column">{`Delegate address #${index + 1}`}</label>
                <div className="column has-text-right">
                  <button
                    className="delete"
                    onClick={(e) => remove(e, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <input
                type="text"
                placeholder='delegateAddress'
                value={vote.delegateAddress}
                onChange={(e) => onchange(e, index, 'delegateAddress')}
              />
              <label>Amount</label>
              <input
                type="text"
                placeholder='amount'
                value={vote.amount}
                onChange={(e) => onchange(e, index, 'amount')}
              />
            </div>
          </fieldset>
        ))
      }
      <fieldset className="has-text-right">
        <button
          className="button"
          onClick={add}
        >
          Add another delegate
        </button>
        <button
          className="button is-primary"
          onClick={submit}
        >
          Create
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
