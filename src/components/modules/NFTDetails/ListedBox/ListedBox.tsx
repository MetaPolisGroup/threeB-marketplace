import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { getEllipsisTxt } from 'utils/format';
import styless from './ListedBox.module.css';
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import constants from '../../../../../constants';
import { failureModal, successModal } from '../../../../../helpers/modal';
import { useRouter } from 'next/router';
import { getExplorer } from '../../../../../helpers/networks';
import Image from 'next/image';

interface ListedBoxParams {
  address: string | undefined;
  price: string | undefined;
  item: string | undefined;
  tokenAddress: string | undefined;
}

const ListedBox = ({ address, price, item, tokenAddress }: ListedBoxParams) => {
  const { data: signer } = useSigner();
  const router = useRouter();
  const [transferPrice, setTransferPrice] = useState<BigNumber>();

  const { config } = usePrepareContractWrite({
    // eslint-disable-next-line etc/no-commented-out-code
    // address: '0x08b749d12c8d4b9C9ECBbe166A9bCf324f793dd6',

    address: constants.MRKPLACE_ADDR as `0x${string}`,
    abi: constants.MRKPLACE_ABI,
    functionName: 'createMarketSale',
    args: [address, item, { value: transferPrice }],
    onSettled(data: any, error: any) {
      console.log('Settled', { data, error });
    },
    signer,
    enabled: Boolean(signer),
  });
  const { write, isSuccess, status, isError, error, isLoading } = useContractWrite(config);

  useEffect(() => {
    if (price !== '' && typeof price === 'string') {
      const Price = ethers.utils.parseEther(price);
      setTransferPrice(Price);
    }
  }, [price]);

  useEffect(() => {
    if (isSuccess) {
      successModal();
      router.push('/my-collection/nft');
    } else if (isError) {
      failureModal(undefined, error?.message);
    }
  }, [isSuccess, status, isError]);

  const buyItem = async () => {
    if (signer) {
      try {
        write?.();
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      failureModal('Error', 'Please connect your wallet first');
    }
  };

  const txHash = `${getExplorer(constants.CHAIN.bscChain.id)}address/${tokenAddress}`;
  return (
    <div className={styless.cardListedbox}>
      <div className={styless.description}>
        Contract by:
        <a className={styless.viewAddress} style={{ color: '#000', fontWeight: 'bold', marginLeft: '10px' }}>
          {getEllipsisTxt(address ? address : '')}
        </a>
      </div>
      <div className={styless.prices}>
        <Image src="/images/BnbPrice.png" width={30} height={30} />
        <span style={{ marginLeft: '15px' }}>
          {price === '0.0' ? '--' : price} <span style={{ fontSize: '50%' }}>BNB</span>
        </span>
      </div>
      <div className={styless.content}>
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <Button
              className={styless.exploreBtn}
              style={{ marginTop: '10px' }}
              disabled={price === '0.0'}
              onClick={() => {
                window.open(txHash, '_blank');
              }}
            >
              <span>Trx Info</span>
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className={styless.btnInfo}
              style={{
                fontFamily: 'GILROY',
                fontWeight: 700,
                marginTop: '10px',
              }}
              onClick={buyItem}
              loading={isLoading}
            >
              <span>Buy</span>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ListedBox;
