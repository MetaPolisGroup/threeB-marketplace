import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ButtonConnect } from '../ButtonConnect';
import { SearchComponent } from 'components/elements';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          {/* <NavBar /> */}
          <SearchComponent />

          <HStack gap={'10px'}>
            <ButtonConnect />
            {/* <ColorModeButton /> */}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
