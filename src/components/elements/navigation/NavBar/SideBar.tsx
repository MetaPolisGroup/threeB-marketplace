import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import css from './index.module.css';
import MobileNav from './MobileSideBar';
import NavItem from './SideBarItem';
import { useAccount, useDisconnect } from 'wagmi';
import { NextRouter, useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useAppDispatch } from 'store/hooks';
import { clearUserInfo } from 'store/slice/user-slice';
import { MoralisLogo } from 'components/elements/MoralisLogo';

interface LinkItemProps {
  name: string;
  src: string;
  path: string;
}

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const dispatch = useAppDispatch();

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ redirect: false });
    dispatch(clearUserInfo());
    window.localStorage.removeItem('address');
  };
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        className={css['slide-bar']}
        bg="#1D1F2F"
        isConnected={isConnected}
        onLogoutHandler={handleDisconnect}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} isConnected={isConnected} onLogoutHandler={handleDisconnect} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 96 }} minH={851} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isConnected: boolean;
  onLogoutHandler: () => void;
}

const SidebarContent = ({ onClose, isConnected, onLogoutHandler, ...rest }: SidebarProps) => {
  const [isConnect, setIsConnect] = useState(false);
  const router = useRouter();

  const LinkItemsNFT: Array<LinkItemProps> = [
    { name: 'Explore', src: router.pathname === '/' ? '/icons/explore-active.png' : '/icons/explore.png', path: '/' },
    {
      name: 'My Collection',
      src: router.pathname === '/my-collection/nft' ? '/icons/collection-active.png' : '/icons/collection.png',
      path: '/my-collection/nft',
    },
    {
      name: 'Activities',
      src: router.pathname === '/history/nft' ? '/icons/history-active.png' : '/icons/history.png',
      path: '/history/nft',
    },
    {
      name: 'Profile',
      src: router.pathname === '/history/nft' ? '/icons/history-active.png' : '/icons/history.png',
      path: '/profile',
    },
  ];

  useEffect(() => {
    setIsConnect(isConnected);
  }, [isConnected]);

  return (
    <Box
      borderRight="1px"
      borderBottom="1px"
      borderRightColor={useColorModeValue('gray.200', '#1D1F2F')}
      borderBottomColor={useColorModeValue('gray.200', '#1D1F2F')}
      w={{ base: 'full', md: 60 }}
      pos="absolute"
      h="100vh"
      {...rest}
    >
      <Flex alignItems="center" marginBottom={5} margin="8px 0px 0px 61px" gap="10px" justifyContent="space-between">
        <Flex alignItems="center" gap="10px">
          <MoralisLogo />
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} margin="10px" onClick={onClose} />
      </Flex>
      <div style={{ padding: '10px 60px' }}>
        <RenderItemNav list={LinkItemsNFT} title="NFT Marketplace" router={router} />
        <button className={css['slidebar-button']} onClick={() => router.push('/createnft')}>
          <span>Create</span>
        </button>

        {/* <RenderItemNav list={LinkItemsDex} title="DEX" router={router} /> */}

        <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700, margin: '30px 0', cursor: 'pointer' }}>DEX</p>
        <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700, margin: '30px 0', cursor: 'pointer' }}>
          Prediction
        </p>
        <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700, cursor: 'pointer' }}>AI Trading Bot</p>
        {isConnect && (
          <button className={css['slidebar-button-signout']} onClick={onLogoutHandler}>
            <Image width={39} height={39} src="/icons/signout.png" />
            <span>Signout</span>
          </button>
        )}
      </div>
    </Box>
  );
};

const RenderItemNav: React.FC<{
  title: string;
  list: LinkItemProps[];
  router: NextRouter;
}> = ({ list, title, router }) => {
  return (
    <React.Fragment>
      <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700, marginTop: 50 }}>{title}</p>
      {list.map((link) => (
        <NavItem key={link.name} src={link.src} style={{ gap: 13 }} path={link.path}>
          <span style={{ fontWeight: 400, fontSize: 18, color: router.pathname === link.path ? '#5356FB' : '' }}>
            {link.name}
          </span>
        </NavItem>
      ))}
    </React.Fragment>
  );
};
