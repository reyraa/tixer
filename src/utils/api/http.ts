const urls: { [key: string]: string } = {
  mainnet: 'https://service.lisk.com/api/v2',
  testnet: 'https://testnet-service.lisk.com/api/v2',
};

interface HttpProps {
  network: string;
  path: string;
  params?: any;
}

const http = ({
  network, path, params,
}: HttpProps) => {
  try {
    const baseUrl = urls[network];
    const url = new URL(`${baseUrl}${path}`);
    url.search = new URLSearchParams(params).toString();

    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const { message } = await response.json();
          const error = Error(response.statusText);
          error.message = message;
          throw error;
        }
        return response.json();
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    // return Promise.reject(Error(e));
  }
};

export default http;
