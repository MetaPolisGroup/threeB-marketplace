import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY || '',
  authentication: {
    // eslint-disable-next-line etc/no-commented-out-code
    // domain: 'explore.1988dragon.com',
    domain: 'nft.threeb.ai',
    uri: process.env.NEXTAUTH_URL || '',
    timeout: 120,
  },
});
