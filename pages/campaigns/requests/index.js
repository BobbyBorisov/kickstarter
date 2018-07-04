import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaign';

class RequestIndex extends Component {
  static async getInitialProps(props){
    const {address} = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const contributorsCount = await campaign.methods.contributorsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    return {address, requests, requestCount, contributorsCount};
  }

  renderRow(){
      return this.props.requests.map((request, index) => {
        return <RequestRow
                id={index}
                request={request}
                address={this.props.address}
                contributorsCount={this.props.contributorsCount}
                key={index}
               />;
      });
  }

  render(){
    const {Header, Row, HeaderCell, Body} = Table;

    return (
      <Layout>
        <h3>Request list</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;
