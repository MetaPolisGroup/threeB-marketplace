import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { Text, HStack, Avatar, useToast } from '@chakra-ui/react';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import classes from './ButtonConnect.module.css';
import constants from '../../../../constants';
import { useAppDispatch } from 'store/hooks';
import { EvmAddressish } from 'moralis/common-evm-utils';
import { clearUserInfo, setUserInfo } from 'store/slice/user-slice';
import { useState } from 'react';
import { Modal } from 'antd';

const ButtonConnect = () => {
  const { disconnectAsync } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [open, setOpen] = useState(true);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { data } = useSession();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const dispatch = useAppDispatch();

  const handleAuth = async () => {
    try {
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
      dispatch(setUserInfo({ address, isAuth: true }));
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
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ redirect: false });
    hideModal();
    dispatch(clearUserInfo());
    window.localStorage.removeItem('address');
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

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
                  <button
                    onClick={() => {
                      openConnectModal();
                      showModal();
                    }}
                    type="button"
                    className={classes['connect-button']}
                  >
                    Connect
                  </button>
                );
              }
              if (isConnected && !data?.user?.address && !window.localStorage.getItem('address')) {
                return (
                  <>
                    <button
                      onClick={() => {
                        showModal();
                      }}
                      type="button"
                      className={classes['connect-button']}
                    >
                      Sign
                    </button>
                    <Modal
                      title="Warning"
                      open={open}
                      okText="Sign"
                      onOk={() => {
                        handleAuth();
                        showModal();
                      }}
                      onCancel={hideModal}
                    >
                      <p>You have to sign to continue.</p>
                    </Modal>
                  </>
                );
              }
              if (chain.unsupported) {
                return (
                  <>
                    <button
                      onClick={() => {
                        showModal();
                      }}
                      type="button"
                      className={classes['connect-button']}
                    >
                      Change network
                    </button>
                    <Modal
                      title="Warning"
                      open={open}
                      okText="Change network"
                      onOk={() => {
                        openChainModal();
                        showModal();
                      }}
                      onCancel={hideModal}
                    >
                      <p>Wrong network! You have to change to network.</p>
                    </Modal>
                  </>
                );
              }
              return (
                <HStack onClick={handleDisconnect} cursor={'pointer'}>
                  <Avatar size="md" />
                  <Text fontWeight="medium" color={'white'} fontSize="lg">
                    {account.displayName}
                  </Text>
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
