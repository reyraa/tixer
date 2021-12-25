import http from './http';

const httpPaths = {
  account: '/accounts',
};

interface AccountApiProps {
  params: {
    publicKey?: string;
    address?: string;
  };
  network: string;
}

export const getAccount = async ({ params, network }: AccountApiProps) => {
  try {
    const response = await http({
      network,
      path: httpPaths.account,
      params,
    });

    if (response.data.length) {
      return response.data[0];
    }
  } catch (e: any) {
    throw Error(e);
  }
  throw Error('Error retrieving account');
};
