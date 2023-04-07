import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { NFTCard } from 'components/modules';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useAccount, useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const NFTBalances = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: nfts } = useEvmWalletNFTs({
    address: address ? address : '',
    chain: chain?.id,
  });

  useEffect(() => console.log('nfts: ', nfts), [nfts]);

  return (
    <>
      <Heading size="lg" marginBottom={6} margin={["20px 0px", ""]}>
        NFT Balances
      </Heading>

      {nfts?.length ? (
        <div className="nft">
          <Grid templateColumns="repeat(auto-fill, 350px)" rowGap={5} justifyItems='center'
          >
            {nfts.map((nft, key) => (
              <GridItem key={key}>
                <NFTCard nft={nft} />
              </GridItem>
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
