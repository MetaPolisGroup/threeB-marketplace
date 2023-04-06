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

interface LinkItemProps {
  name: string;
  src: string;
  path: string;
}

const LinkItemsNFT: Array<LinkItemProps> = [
  { name: 'Explore', src: '/icons/explore.png', path: '/' },
  { name: 'My Collection', src: '/icons/collection.png', path: '/my-collection/nft' },
  { name: 'Activities', src: '/icons/history.png', path: '/history/nft' },
];

const LinkItemsDex: Array<LinkItemProps> = [
  { name: 'My Wallet', src: '/icons/wallet.png', path: '/my-collection/erc20' },
  { name: 'History', src: '/icons/history.png', path: '/history/erc20' },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  const handleDisconnect = async () => {
    await disconnectAsync();
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
      <Flex alignItems="center" marginBottom={5} margin="8px 0px 0px 61px" gap="10px">
        <Image src="/images/logo.png" alt="asd" width={58} height={56} />
        <h2 style={{ fontWeight: 700, color: 'white' }}>Logo</h2>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <div style={{ padding: '10px 60px' }}>
        <RenderItemNav list={LinkItemsNFT} title="NFT Marketplace" />
        <button className={css['slidebar-button']}>
          <span>Create</span>
        </button>

        <RenderItemNav list={LinkItemsDex} title="DEX" />

        <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700, margin: '30px 0' }}>Prediction</p>
        <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700 }}>AI Trading Bot</p>
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
}> = ({ list, title }) => {
  return (
    <React.Fragment>
      <p style={{ fontSize: 20, color: '#5356FB', fontWeight: 700, marginTop: 50 }}>{title}</p>
      {list.map((link) => (
        <NavItem key={link.name} src={link.src} style={{ gap: 13 }} path={link.path}>
          <span style={{ fontWeight: 400, fontSize: 18 }}>{link.name}</span>
        </NavItem>
      ))}
    </React.Fragment>
  );
};
