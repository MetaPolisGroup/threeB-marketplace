import { Box, Flex, HStack } from '@chakra-ui/react';
import SearchComponent from 'components/elements/search/SearchComponent';

import { ButtonConnect } from '../ButtonConnect';

const Content = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Flex align="center" justify="space-between" pb='36px'>
        <SearchComponent />
        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <HStack gap={'10px'}>
              <ButtonConnect />
            </HStack>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Content;
