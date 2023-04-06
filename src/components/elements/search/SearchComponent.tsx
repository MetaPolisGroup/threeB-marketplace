import { PhoneIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import css from './index.module.css'
const SearchComponent = () => {
  return <div>
    <InputGroup className={css['wrapper-input-header']}>
      <InputLeftElement
        pointerEvents='none'
        children={<PhoneIcon color='gray.300' />}

      />
      <Input placeholder='Search items , collections....' variant='unstyled' />
    </InputGroup>
  </div>
};

export default SearchComponent;
