// eslint-disable-next-line etc/no-commented-out-code
// import { DeleteIcon } from '@chakra-ui/icons';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Heading, Box, useColorModeValue } from '@chakra-ui/react';
import { useEvmWalletTransactions } from '@moralisweb3/next';

import { useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { useAccount, useNetwork } from 'wagmi';
// eslint-disable-next-line etc/no-commented-out-code
// import { ethers, Signer } from 'ethers';
// import { failureModal, successModal } from '../../../../../helpers/modal';

// eslint-disable-next-line etc/no-commented-out-code
// import { resolveIPFSByPinata, resolveIPFSByPublicGateway } from 'utils/resolveIPFS';
// import constants from '../../../../../constants';

const NFTTransfers = () => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  // eslint-disable-next-line etc/no-commented-out-code
  // const borderTrColor = useColorModeValue('#edf2f7', '#2d3748');

  const { address } = useAccount();
  const { chain } = useNetwork();

  // eslint-disable-next-line etc/no-commented-out-code
  // const { data: signer } = useSigner();

  const { data: transactions } = useEvmWalletTransactions({
    address: address ? address : '',
    chain: chain?.id,
  });

  // const handleDelete = async (nftContract?: string, tokenId?: string) => {
  //   console.log(nftContract, tokenId);
  //   try {
  //     if (!nftContract || !tokenId) {
  //       return;
  //     }
  //     const deleteABI = ['function handleDelete(address, uint256)'];
  //     const deleteCollection = new ethers.Contract(constants.MRKPLACE_ADDR, deleteABI, signer as Signer);
  //     const txDelete = await deleteCollection.handleDelete(nftContract, tokenId);
  //     await txDelete.wait();
  //     successModal('Success', 'Remove listed item successfully');
  //   } catch (e) {
  //     failureModal('Fail', 'Fail to remove listed item');
  //   }
  // };

  // const fetchItemsTransaction = async () => {
  //   const itemsData: INFTTransaction[] = [];
  //   const metadataItems: INFTTransaction[] = [];
  //   const nftTranxCollectionRef = collection(dbFS, 'moralis/events', `Marketplace_${chain?.id}`);
  //   console.log('seller', data?.user?.address.toLowerCase(), 'chainId', chain?.id);
  //   const querySentence = query(
  //     nftTranxCollectionRef,
  //     where('seller', '==', data?.user?.address.toLowerCase()),
  //     where('chainId', '==', chain?.id),
  //     orderBy('blockTimestamp', 'desc'),
  //   );
  //   const querySnapshot = await getDocs(querySentence);
  //   console.log(querySnapshot);
  //   // eslint-disable-next-line @typescript-eslint/no-shadow
  //   querySnapshot.forEach((doc) => {
  //     const { tokenId } = doc.data();
  //     console.log('tokenId', doc);
  //     const txToken = itemsData.find((item) => item.tokenId === tokenId);
  //     if (!txToken) {
  //       itemsData.push(doc.data());
  //     }
  //   });
  //   if (itemsData.length > 0) {
  //     for (let i = 0; i < itemsData.length; i++) {
  //       let chainName = chain?.name;
  //       if (chain?.id === 97) {
  //         chainName = 'bsc%20testnet';
  //       } else if (chain?.id === 56) {
  //         chainName = 'bsc';
  //       }
  //       const url = `https://deep-index.moralis.io/api/v2/nft/${itemsData[i]?.nftContract}/${itemsData[i]?.tokenId}?chain=${chainName}&format=decimal&normalizeMetadata=true`;
  //       console.log(url);
  //       // eslint-disable-next-line no-await-in-loop
  //       const response = await fetch(url, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-API-Key': `${process.env.NEXT_PUBLIC_MORALIS_API_KEY}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error('Can not fetch metadata by using address and tokenId');
  //       }
  //       // eslint-disable-next-line no-await-in-loop
  //       const metadataItem = await response.json();
  //       metadataItems.push({ ...itemsData[i], image: metadataItem?.normalized_metadata?.image });
  //     }
  //     setNftTrxs(metadataItems);
  //   }
  // };

  useEffect(() => {
    if (chain && address) {
      console.log(transactions);
    }
  }, []);

  const getDate = (timestamp?: any): string => {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // const getPrice = (price?: string): string => {
  //   if (!price || price === '0') {
  //     return '';
  //   }
  //   return ethers.utils.formatEther(price).toString();
  // };

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        NFT Transactions
      </Heading>
      {transactions?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  {/* <Th>Item</Th> */}
                  <Th>Transaction Status</Th>
                  <Th>Price</Th>
                  <Th isNumeric>Tx Hash</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((nftTrx, index) => {
                  // if (nftTrx?.seller === data?.user?.address.toLowerCase() && nftTrx?.chainId === chain?.id) {
                  return (
                    <Tr key={index} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                      <Td>{getDate(nftTrx?.blockTimestamp)}</Td>
                      <Td>{getEllipsisTxt(nftTrx?.from?.checksum)}</Td>
                      <Td>{getEllipsisTxt(nftTrx.to?.checksum)}</Td>
                      {/* <Td>
                        <img
                          src={
                            nftTrx?.nftContract === constants.NFT_ADDR
                              ? resolveIPFSByPinata(nftTrx.image)
                              : resolveIPFSByPublicGateway(nftTrx.image)
                          }
                          alt="Item image"
                        />
                      </Td> */}
                      <Td>
                        {/* {nftTrx?.status === 'PENDING' ? (
                          <span
                            style={{
                              margin: '10px 0 0 10px',
                              padding: '5px 10px',
                              border: '1px solid #eee',
                              borderRadius: '8px',
                              borderColor: '#ffeb3b',
                              color: '#ffeb3b',
                            }}
                          >
                            Pending
                          </span>
                        )  */}
                        {nftTrx?.receiptStatus === 1 ? (
                          <span
                            style={{
                              display: 'block',
                              textAlign: 'center',
                              padding: '5px 10px',
                              border: '1px solid #eee',
                              borderRadius: '8px',
                              borderColor: '#00c9a7',
                              color: '#00c9a7',
                            }}
                          >
                            Success
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'block',
                              textAlign: 'center',
                              padding: '5px 10px',
                              border: '1px solid #eee',
                              borderRadius: '8px',
                              borderColor: '#f5473b',
                              color: '#f5473b',
                            }}
                          >
                            Failed
                          </span>
                        )}
                      </Td>
                      <Td>{nftTrx?.value?.ether}</Td>
                      <Td isNumeric>{getEllipsisTxt(nftTrx?.hash, 4)}</Td>
                      {/* <Td>
                        {nftTrx?.status === 'PENDING' && nftTrx?.nftContract ? (
                          <Button onClick={() => handleDelete(nftTrx?.nftContract, nftTrx?.tokenId)}>
                            <DeleteIcon color="red.400" />
                          </Button>
                        ) : (
                          ''
                        )}
                      </Td> */}
                    </Tr>
                  );
                  // }
                  // return <Tr borderColor={borderTrColor}>Looks like you do not have any NFT Transactions</Tr>;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks like you do not have any NFT Transactions</Box>
      )}
    </>
  );
};

export default NFTTransfers;
