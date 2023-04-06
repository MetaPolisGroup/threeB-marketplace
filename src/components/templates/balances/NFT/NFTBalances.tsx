import { Grid, Heading } from '@chakra-ui/react';
import { NFTCard } from 'components/modules';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useAccount, useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const NFTBalances = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: nfts } = useEvmWalletNFTs({
    address: address ? address : '',
    chain: chain?.id,
  });

  useEffect(() => console.log('nfts: ', nfts), [nfts]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        NFT Balances
      </Heading>

      {nfts?.length ? (
        <div className="nft">
          <Grid className="NFT">
            {nfts.map((nft, key) => (
              <NFTCard nft={nft} key={key} />
            ))}
          </Grid>
        </div>
      ) : (
        <Box>Looks like you do not have any NFTs</Box>
      )}
    </>
  );
};

export default NFTBalances;
