import React, { useEffect, useRef, useState } from 'react';
import QRCode from "react-qr-code";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isEmpty } from '../../utils/helpers';
import { txToHex } from '../../utils/transaction';
import appStoreImage from '../../assets/images/appstore.svg';
import gPlayImage from '../../assets/images/googleplay.svg';
import './result.css';

interface ResultProps {
  value: any;
}

const Result = ({ value }: ResultProps) => {
  const [json, setJson] = useState<any>({});
  const [copied, setCopied] = useState<boolean>(false);
  const timeout = useRef<any>();

  const copy = () => {
    setCopied(true);

    timeout.current = setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  useEffect(() => {
    const val = txToHex(value);
    setJson(JSON.stringify(val));
  }, [value]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const defaultMessage = 'Create a Lisk transaction to sign using Lisk Mobile';
  const message = isEmpty(value) ? defaultMessage : json;

  return (
    <aside className="column result">
      <div>
        <QRCode
          value={message}
          bgColor="#101c3d"
          fgColor="#FFFFFF"
        />
        <CopyToClipboard text={message} onCopy={copy}>
            <button className="is-primary">
              { copied ? 'Copied' : 'Copy' }
            </button>
        </CopyToClipboard>
        <footer>
          <h5>Scan the above QR code using Lisk Mobile</h5>
          <p>(You should be signed in with the account that you defined as the sender)</p>
          <nav>
            <a
              href="https://play.google.com/store/apps/details?id=io.lisk.mobile&hl=en"
              target="_blank"
            >
              <img
                src={appStoreImage}
                alt="Download Lisk Mobile from App Store"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/lisk/id1436809559"
              target="_blank"
            >
              <img
                src={gPlayImage}
                alt="Download Lisk Mobile from Google Play store"
              />
            </a>
          </nav>
        </footer>
      </div>
    </aside>
  );
}

export default Result;
