import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isEmpty } from '../../utils/helpers';
import { txToHex } from '../../utils/transaction';
import './result.css';

interface ResultProps {
  value: any;
}

const Result = ({ value }: ResultProps) => {
  const [json, setJson] = useState<any>({});
  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
    const val = txToHex(value);
    setJson(JSON.stringify(val));
  }, [value]);

  return (
    <section className="result">
       {
         isEmpty(value)
          ? null
          : (
            <div>
              <QRCode value={json} />
              <CopyToClipboard text={json} onCopy={() => setCopied(true)}>
                  <button>
                    { copied ? 'Copied' : 'Copy' }
                  </button>
              </CopyToClipboard>
            </div>
          )
      }
    </section>
  );
}

export default Result;
