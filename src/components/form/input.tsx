import React, { ChangeEvent } from 'react';
import './form.css';

interface Value {
  data: any;
  error: string;
}

interface Props {
  type: string;
  label: string;
  value: Value;
  onChange: (value: Value) => void;
  validator: (data: any, info?: any) => string;
  validationInfo?: any;
}

const Input = ({
  value, onChange, validator, label, type, validationInfo,
}: Props) => {
  const onChangeInternal = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange({
      data: e.target.value,
      error: validator(e.target.value, validationInfo),
    });
  };


  return <label className='inputWrapper'>
    <span className='inputLabel'>{ label }</span>
    <input
      className='input-val'
      type={type}
      value={value.data}
      onChange={(e) => onChangeInternal(e)}
    /> 
    {
      value.error ? (
        <span className='inputError'>{ value.error }</span>
      ) : null
    }
  </label>
};

export default Input;
