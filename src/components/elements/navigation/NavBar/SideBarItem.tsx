import { Flex, FlexProps, Link } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface NavItemProps extends FlexProps {
    src: string;
    children: React.ReactNode;
}

const NavItem = ({ src, children, ...rest }: NavItemProps) => {
    return <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
            align="center"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            my='20px'
           
            {...rest}>
            {src && (
                <Image src={src}
                    width={32}
                    height={32}
                />
            )}
            {children}
        </Flex>
    </Link>
}

export default NavItem
