import React, { useState, ChangeEvent, MouseEvent } from 'react';
import '../form.css';

interface FormProps {
  onSubmit: (tx: any) => void
}

interface Member {
  publicKey: string;
  isMandatory: boolean;
}

const emptyMember: Member = {
  publicKey: '',
  isMandatory: true,
};

const Form = ({ onSubmit }: FormProps) => {
  const [members, setMembers] = useState<Member[]>([]);

  const onchange = (e: ChangeEvent<HTMLInputElement>, index: number, name: string) => {
    const newMembers: Member[] = members.map((member, i) => {
      if (index === i) {
        return {
          publicKey: name === 'publicKey' ? e.target.value : member.publicKey,
          isMandatory: name === 'isMandatory' ? Boolean(e.target.checked) : member.isMandatory,
        }
      }
      return member;
    });
    setMembers(newMembers);
  };

  const submit = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit({
      members,
    });
  };

  const add = (e: MouseEvent) => {
    e.preventDefault();
    setMembers([
      ...members,
      emptyMember,
    ]);
  };

  const remove = (e: MouseEvent, index: number) => {
    e.preventDefault();
    const newVotes: Member[] = members.filter((_, i) => (i !== index));
    setMembers(newVotes);
  };


  return (
    <form>
      {
        members.map((member, index) => (
          <fieldset className="message is-info member" key={index}>
            <div className="message-body">
              <div className="columns">
                <label className="label column">{`Public key #${index + 1}`}</label>
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
                placeholder='publicKey'
                value={member.publicKey}
                onChange={(e) => onchange(e, index, 'publicKey')}
              />
              <label className="radio">
                <input
                  type="checkbox"
                  name='isMandatory'
                  checked={member.isMandatory}
                  onChange={(e) => onchange(e, index, 'isMandatory')}
                />
                Mandatory member
              </label>
            </div>
          </fieldset>
        ))
      }
      <fieldset className="has-text-right">
        <button
          className="button mt-2 mr-2"
          onClick={add}
        >
          Add another member
        </button>
        <button
          className="button is-primary mt-2"
          onClick={submit}
        >
          Create
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
