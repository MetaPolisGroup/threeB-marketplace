import { Flex, FlexProps, IconButton, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import {
    FiMenu
} from 'react-icons/fi';
interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Image src="/images/logo.png" alt="asd" width={58} height={56} />

        </Flex>
    );
};

export default MobileNav