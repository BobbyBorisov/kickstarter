import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import {Card} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {
  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      contributorsCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards(){
    const {balance, manager, minimumContribution, requestCount, contributorsCount} = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description: "A manager created this campaign and can create request to withdraw money",
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution(wei)",
        description: "You must contribute at least this much wei to be marked as a contributor"
      },
      {
        header: requestCount,
        meta: "Number of requests",
        description: "Request tries to withdraw money from the contract. Requests must be approved by contributors"
      },
      {
        header: contributorsCount,
        meta: "Number of contributors",
        description: "Number of people who have already donated to the campaign"
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta: "Campaign Balance(ether)",
        description: "The balance is how much money this campaign has left to spend"
      }
    ];

    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <h3>show component</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;
