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

  const defaultMessage = 'Create a Lisk transaction to sign using Lisk Mobile';

  const message = isEmpty(value) ? defaultMessage : json;

  return (
    <aside className="column result">
      <div>
        <QRCode value={message} />
        <CopyToClipboard text={message} onCopy={() => setCopied(true)}>
            <button>
              { copied ? 'Copied' : 'Copy' }
            </button>
        </CopyToClipboard>
      </div>
    </aside>
  );
}

export default Result;
