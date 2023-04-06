import { signIn } from 'next-auth/react';
import { useAccount, useSignMessage } from 'wagmi';
import { Text, HStack, Avatar, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { EvmAddressish } from 'moralis/common-evm-utils';
import { useSession } from 'next-auth/react';
import constants from '../../../../constants';
import classes from './ButtonConnect.module.css';

const ButtonConnect = () => {
  const { address, isConnected } = useAccount();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { data } = useSession();

  async function signInNext() {
    try {
      console.log('address', address);
      console.log('isConnected', isConnected);
      const challenge = await requestChallengeAsync({
        address: address as EvmAddressish,
        chainId: constants.CHAIN.bscChain.id,
      });
      if (!challenge) {
        throw new Error('No challenge received');
      }
      const signature = await signMessageAsync({ message: challenge.message });
      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
      window.localStorage.setItem('address', address as string);
    } catch (e) {
      console.log('Error', (e as { message: string })?.message);
      toast({
        title: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (isConnected === true && !data?.user?.address && !window.localStorage.getItem('address')) {
      signInNext();
    }
  }, [isConnected, address]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, openAccountModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={classes['connect-button']}>
                    Connect
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <HStack onClick={openAccountModal} cursor={'pointer'}>
                  <Avatar size="xs" />
                  <Text fontWeight="medium">{account.displayName}</Text>
                </HStack>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ButtonConnect;
