import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { validatePublicKey } from '../validators';
import '../form.css';
import Input from '../input';

interface FormProps {
  onSubmit: (tx: any) => void
}

interface Member {
  publicKey: { data: string, error: string };
  isMandatory: boolean;
}

interface Value {
  data: any;
  error: string;
}
const emptyMember: Member = {
  publicKey: { data: '', error: '' },
  isMandatory: true,
};

const Form = ({ onSubmit }: FormProps) => {
  const [members, setMembers] = useState<Member[]>([emptyMember, emptyMember]);

  const onChange = (val: Value, index: number, name: string) => {
    const newMembers: Member[] = members.map((member, i) => {
      if (index === i) {
        return {
          publicKey: val,
          isMandatory: member.isMandatory,
        }
      }
      return member;
    });
    setMembers(newMembers);
  };


  const onChecked = (e: ChangeEvent<HTMLInputElement>, index: number, name: string) => {
    const newMembers: Member[] = members.map((member, i) => {
      if (index === i) {
        return {
          publicKey: member.publicKey,
          isMandatory: e.target.checked,
        }
      }
      return member;
    });
    setMembers(newMembers);
  }

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
                <label className="label column memberTitle">{`Member #${index + 1}`}</label>
                <div className="column has-text-right">
                  <button
                    className="remove"
                    onClick={(e) => remove(e, index)}
                  ></button>
                </div>
              </div>

              <Input
                type="text"
                label='publickey'
                value={member.publicKey}
                validator={validatePublicKey} 
                onChange={(val) => onChange(val, index ,'publicKey')}
               />
              <label className="radio">
                <input
                  type="checkbox"
                  name='isMandatory'
                  checked={member.isMandatory}
                  onChange={(e) => onChecked(e, index, 'isMandatory')}
                />
                <span>Mandatory member</span>
              </label>
            </div>
          </fieldset>
        ))
      }
      <fieldset className="has-text-right">
        <button
          className="is-secondary mt-2 mr-2"
          onClick={add}
        >
          Add another member
        </button>
        <button
          className="is-primary mt-2"
          onClick={submit}
        >
          Create
        </button>
      </fieldset>
    </form>
  );
}

export default Form;
