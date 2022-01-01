import React, { useState } from 'react';
import { capitalize } from '../../utils/helpers';
import { createTransaction } from '../../utils/transaction';
import TypeSelector from './typeSelector';
import detailComponents from './details';
import Basics from './basics'
import './form.css';

interface BasicProps {
  senderPublicKey: string;
  nonce: number;
  fee: number;
}

interface FormProps {
  onTxCreated: (tx: any) => void;
  setBasics: (data: BasicProps) => void;
  networkConfig: any;
  basics: BasicProps;
}

interface moduleAsset {
  id: string;
  name: string;
}

interface CreateTransactionProps {
  senderPublicKey: string;
  moduleAssetId: string;
  nonce: number;
  fee: number;
  assets: any;
  moduleAssets: moduleAsset[];
}

const Form = ({ onTxCreated, networkConfig, setBasics, basics }: FormProps) => {
  const [moduleAssetId, setModuleAssetId] = useState('2:0');

  const moduleName: string = networkConfig.moduleAssets.find((item: moduleAsset) => item.id === moduleAssetId).name.split(':')[1];
  // @ts-ignore
  const Layout = detailComponents[capitalize(moduleName)];

  const onSubmit = (assets: any) => {
    const props: CreateTransactionProps = {
      ...basics,
      assets,
      moduleAssetId,
      moduleAssets: networkConfig.moduleAssets,
    };
    onTxCreated(createTransaction(props));
  };

  return (
    <main className="column">
      <TypeSelector
        moduleAssets={networkConfig.moduleAssets}
        onTypeChanged={setModuleAssetId}
      />
      <Basics setBasics={setBasics} basics={basics} />
      {
        <Layout onSubmit={onSubmit} />
      }
    </main>
  );
}

export default Form;
