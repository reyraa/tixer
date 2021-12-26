import React, { ChangeEvent } from 'react';

interface moduleAsset {
  id: string;
  name: string;
}

interface TypeSelectorProps {
  onTypeChanged: (network: string) => void;
  moduleAssets: moduleAsset[];
}

const TypeSelector = ({
  moduleAssets, onTypeChanged,
}: TypeSelectorProps) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onTypeChanged(e.target.value);
  };

  return (
      <form>
        <label>Transaction type</label>
        <select onChange={onChange}>
          {
            moduleAssets.map((item) => (
              <option
                value={item.id}
                key={item.id}
              >
                {item.name}
              </option>
            ))
          }
        </select>
      </form>
  );
};

export default TypeSelector;
