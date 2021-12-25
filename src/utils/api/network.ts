import http from './http';

const httpPaths = {
  networkStatus: '/network/status',
};

interface NetworkApiProps {
  network: string;
}

export const getNetworkConfig = ({ network }: NetworkApiProps) => http({
  network,
  path: httpPaths.networkStatus,
});
