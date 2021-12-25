import { cryptography } from '@liskhq/lisk-client';

const splitModuleAndAssetIds = (moduleAssetId: string) => {
  const [moduleID, assetID] = moduleAssetId.split(':');
  return [Number(moduleID), Number(assetID)];
};

 export const BedToLsk = (value: number|string = 0): bigint => (
  BigInt(value) / BigInt(1e8)
);

export const LskToBed = (value: number|string = 0): bigint => (
  BigInt(value) * BigInt(1e8)
);

export const convertStringToBinary = (value: string) => Buffer.from(value, 'hex');

export const getAddressFromBase32Address = (data: string) => {
  try {
    return cryptography.getAddressFromBase32Address(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    throw Error('Invalid address');
  }
};

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

interface Transaction {
  moduleID: number;
  assetID: number;
  senderPublicKey: Buffer;
  nonce: bigint;
  fee: bigint;
  signatures: [];
  asset: any
}

interface Vote {
  delegateAddress: string;
  amount: number;
}

interface UnlockObject {
  amount: number;
  delegateAddress: string;
  unvoteHeight: number;
}

/**
 * creates a transaction object to be used with the api client from
 * lisk elements
 * @param {object} tx - the transaction data
 * @param {string} moduleAssetId - moduleAssetId
 * @returns the transaction object
 */
// eslint-disable-next-line max-statements
export const createTransaction = ({
  senderPublicKey,
  moduleAssetId,
  nonce,
  fee,
  assets,
  moduleAssets,
}: CreateTransactionProps) => {
  const [moduleID, assetID] = splitModuleAndAssetIds(moduleAssetId);

  const transaction: Transaction = {
    moduleID,
    assetID,
    senderPublicKey: convertStringToBinary(senderPublicKey),
    nonce: BigInt(nonce),
    fee: BigInt(fee),
    signatures: [],
    asset: null,
  };

  switch (moduleAssetId) {
    case moduleAssets[0].id: {
      const binaryAddress = getAddressFromBase32Address(assets.recipientAddress);

      transaction.asset = {
        recipientAddress: binaryAddress,
        amount: LskToBed(assets.amount),
        data: assets.data,
      };

      break;
    }

    case moduleAssets[2].id: {
      transaction.asset = {
        username: assets.username,
      };
      break;
    }

    case moduleAssets[3].id: {
      const votes = assets.votes.map((vote: Vote) => ({
        amount: LskToBed(vote.amount),
        delegateAddress: getAddressFromBase32Address(vote.delegateAddress),
      }));
      transaction.asset = { votes };
      break;
    }

    case moduleAssets[4].id: {
      transaction.asset = {
        unlockObjects: assets.unlockObjects.map((unlockObject: UnlockObject) => ({
          amount: BigInt(unlockObject.amount),
          delegateAddress: getAddressFromBase32Address(unlockObject.delegateAddress),
          unvoteHeight: unlockObject.unvoteHeight,
        })),
      };
      break;
    }

    case moduleAssets[6].id: {
      transaction.asset = {
        amount: BigInt(assets.amount),
      };
      break;
    }

    case moduleAssets[1].id: {
      transaction.asset = {
        numberOfSignatures: Number(assets.numberOfSignatures),
        mandatoryKeys: assets.mandatoryKeys.map(convertStringToBinary),
        optionalKeys: assets.optionalKeys.map(convertStringToBinary),
      };
      break;
    }

    case moduleAssets[5].id: {
      transaction.asset = {
        numberOfSignatures: Number(assets.numberOfSignatures),
        mandatoryKeys: assets.mandatoryKeys.map(convertStringToBinary),
        optionalKeys: assets.optionalKeys.map(convertStringToBinary),
      };
      break;
    }

    default:
      throw Error('Unknown transaction');
  }

  return transaction;
};
