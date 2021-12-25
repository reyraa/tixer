export const  defaultNetworkConfig = {
  communityIdentifier: "Lisk",
  maxPayloadLength: 15360,
  moduleAssets: [
    {id: "2:0", name: "token:transfer"},
    {id: "4:0", name: "keys:registerMultisignatureGroup"},
    {id: "5:0", name: "dpos:registerDelegate"},
    {id: "5:1", name: "dpos:voteDelegate"},
    {id: "5:2", name: "dpos:unlockToken"},
    {id: "5:3", name: "dpos:reportDelegateMisbehavior"},
    {id: "1000:0", name: "legacyAccount:reclaimLSK"}
  ],
  networkIdentifier: "4c09e6a781fc4c7bdb936ee815de8f94190f8a7519becd9de2081832be309a99",
  networkVersion: "3.0",
  registeredModules: ["token", "sequence", "keys", "dpos", "legacyAccount"],
};

export type NetworkName = 'mainnet'|'testnet';
export type NetworkValue = {
  key: string,
  title: string,
}
export const networkNames: { [key: string]: NetworkValue} = {
  mainnet: {
    key: 'mainnet',
    title: 'Mainnet',
  },
  testnet: {
    key: 'testnet',
    title: 'Testnet'
  },
};
