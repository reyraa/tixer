import React, { ChangeEvent } from 'react';
import { networkNames } from '../../constants';
import './networkSelector.css';

interface NetworkSelectorProps {
  onNetworkChanged: (network: string) => void
}

const NetworkSelector = ({ onNetworkChanged }: NetworkSelectorProps) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onNetworkChanged(e.target.value);
  };

  return (
    <form className="networkSelector">
      <label>Network</label>
      <select onChange={onChange}>
        {
          Object.keys(networkNames).map((item) => (
            <option
              value={item}
              key={item}
            >
              {networkNames[item].title}
            </option>
          ))
        }
      </select>
    </form>
  );
}

export default NetworkSelector;
