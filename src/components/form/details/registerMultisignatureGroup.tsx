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
    <form className='form'>
      {
        members.map((member, index) => (
          <fieldset key={index}>
            <label>Public key</label>
            <input type="string" placeholder='publicKey' value={member.publicKey} onChange={(e) => onchange(e, index, 'publicKey')} />
            <label>Mandatory member</label>
            <input type="checkbox" name='isMandatory' checked={member.isMandatory} onChange={(e) => onchange(e, index, 'isMandatory')}  />
            <button onClick={(e) => remove(e, index)}>Remove</button>
          </fieldset>
        ))
      }
      <button onClick={add}>Add</button>
      <button onClick={submit}>Create</button>
    </form>
  );
}

export default Form;
