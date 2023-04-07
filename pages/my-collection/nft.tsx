import { Default } from 'components/layouts/Default';
import { NFTBalances } from 'components/templates/balances/NFT';
import Profile from './profile';

const ERC20 = () => {
  return (
    <Default pageName="NFT Balances">
      <Profile />
      <NFTBalances />
    </Default>
  );
};

export default ERC20;
