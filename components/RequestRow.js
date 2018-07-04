import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react'
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
  state = {
    approveLoading: false,
    finalizeLoading: false
  }

  onApprove = async () => {
    this.setState({approveLoading:true});
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from:accounts[0]
    });
    this.setState({approveLoading:false});
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
  }

  onFinalize = async () => {
    this.setState({finalizeLoading:true});

    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from:accounts[0]
    });

    this.setState({finalizeLoading:false});
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
  }

  render(){
     const {Row, Cell} = Table;
     const {id, request, contributorsCount} = this.props;
     const readyToFinalize = request.approvalCount > (contributorsCount / 2);

     return (
       <Row disabled={request.complete} positive={!request.complete && readyToFinalize}>
        <Cell>{this.props.id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')} ETH</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{contributorsCount}</Cell>
        <Cell>
          { request.complete ? null : (
            <Button loading={this.state.approveLoading} color="green" basic onClick={this.onApprove}>Approve</Button>
          )}
        </Cell>
        <Cell>
          { !readyToFinalize || request.complete ? null : (
            <Button loading={this.state.finalizeLoading} color="teal" basic onClick={this.onFinalize}>Finalize</Button>
          )}
        </Cell>
       </Row>
     );
  }
}

export default RequestRow;
