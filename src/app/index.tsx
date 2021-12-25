import React, { useEffect, useState } from 'react';
import { cryptography } from '@liskhq/lisk-client';
import NetworkSelector from '../components/networkSelector';
import Form from '../components/form';
import Result from '../components/result';
import { getNetworkConfig } from '../utils/api/network'
import { getAccount } from '../utils/api/account'
import { validatePublicKey } from '../utils/helpers'
import { defaultNetworkConfig, networkNames } from '../constants';
import './app.css';

interface BasicProps {
  senderPublicKey: string;
  nonce: number;
  fee: number;
}

const emptyBasics: BasicProps = {
  senderPublicKey: '',
  nonce: 0,
  fee: 0,
};

const App = () => {
  const [tx, setTx] = useState({});
  const [basics, setBasics] = useState<BasicProps>(emptyBasics);
  const [network, setNetwork] = useState(Object.keys(networkNames)[0]);
  const [networkConfig, setNetworkConfig] = useState(defaultNetworkConfig);

  useEffect(() => {
    // @ts-ignore
    getNetworkConfig({ network })
      .then(response => setNetworkConfig(response.data))
      .catch(() => setNetworkConfig(defaultNetworkConfig));
  }, [network]);

  useEffect(() => {
    if (validatePublicKey(basics.senderPublicKey)) {
      getAccount({ params: { publicKey: basics.senderPublicKey }, network })
        .then((response) => {
          setBasics({
            senderPublicKey: basics.senderPublicKey,
            nonce: response.sequence ? Number(response.sequence.nonce) : basics.nonce,
            fee: 0,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }, [basics.senderPublicKey, network]);

  return (
    <section>
      <NetworkSelector onNetworkChanged={setNetwork} />
      <Form
        setBasics={setBasics}
        onTxCreated={setTx}
        networkConfig={networkConfig}
        basics={basics}
      />
      <Result value={tx} />
    </section>
  );
}

export default App;
