import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x7045d98D6389Af1d308AcE50A94EB51766e0e378'
);

export default instance;
