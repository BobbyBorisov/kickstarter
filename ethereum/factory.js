import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x2d29594F98EeD41d0C7c9916b003d63e47C1aA70'
);

export default instance;
