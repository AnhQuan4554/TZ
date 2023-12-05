import axios from 'axios';

function getTymlezIpfsCdnHost(network: string) {
  if (network === 'testnet') {
    return 'testnet.data.tymlez.com';
  }
  if (network === 'mainnet') {
    return 'mainnet.data.tymlez.com';
  }

  return null;
}

function getIpfsFileUrls(network: string, cid: string) {
  const tymlezCdnHost = getTymlezIpfsCdnHost(network);
  const hosts = [
    'ipfs.io/ipfs',
    'dweb.link/ipfs',
    'gateway.ipfs.io/ipfs',
    tymlezCdnHost,
    //'cloudflare-ipfs.com',
    //'cf-ipfs.com',
  ];

  return hosts.map((host) => `https://${host}/${cid}`);
}

export async function getIpfsFileContentBuffer(
  network: string,
  cid: string,
): Promise<Buffer> {
  const urls = getIpfsFileUrls(network, cid);

  for await (const ipfsUrl of urls) {
    try {
      const { data } = await axios
        .get(ipfsUrl, { responseType: 'arraybuffer' })
        .catch((error) => {
          throw new Error(JSON.stringify(error));
        });
      return data;
    } catch (err) {
      continue;
    }
  }

  throw new Error(`Failed to get IPFS file content from all hosts: ${urls}`);
}
