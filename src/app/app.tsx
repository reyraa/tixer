import React, { useEffect, useState } from 'react';
import NetworkSelector from '../components/networkSelector';
import Header from '../components/header';
import Form from '../components/form';
import Result from '../components/result';
import { getNetworkConfig } from '../utils/api/network'
import { getAccount } from '../utils/api/account'
import { validatePublicKey } from '../utils/helpers'
import { defaultNetworkConfig, networkNames } from '../constants';
import './app.css';

interface BasicProps {
  senderPublicKey: { data: string;  error: string };
  nonce: { data: number;  error: string };
  fee: { data: number;  error: string };
}

const emptyBasics: BasicProps = {
  senderPublicKey: { data: '',  error: '' },
  nonce: { data: 0,  error: '' },
  fee: { data: 0,  error: '' },
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
    if (!basics.senderPublicKey.error) {
      getAccount({ params: { publicKey: basics.senderPublicKey.data }, network })
        .then((response) => {
          setBasics({
            senderPublicKey: basics.senderPublicKey,
            nonce: response.sequence ? { data: Number(response.sequence.nonce), error: '' } : basics.nonce,
            fee: basics.fee,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }, [basics.senderPublicKey, network]);

  return (
    <section className="container">
        <section className="columns">
          <main className="column">
            <Header />
            <NetworkSelector onNetworkChanged={setNetwork} />
            <Form
              setBasics={setBasics}
              onTxCreated={setTx}
              networkConfig={networkConfig}
              basics={basics}
            />
        </main>
        <Result value={tx} />
      </section>
    </section>
  );
}

export default App;
