import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const MoralisLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Link href={'/'}>
      <Image
        className="logo1988"
        src={colorMode === 'dark' ? '/logo-threeb.png' : '/logo-threeb.png'}
        height={90}
        width={180}
        alt="Three B Logo"
        style={{ cursor: 'pointer' }}
      />
    </Link>
  );
};

export default MoralisLogo;
