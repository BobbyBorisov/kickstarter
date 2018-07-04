import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react'
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from:accounts[0]
    });
  }

  render(){
     const {Row, Cell} = Table;
     const {id, request, contributorsCount} = this.props;

     return (
       <Row>
        <Cell>{this.props.id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')} ETH</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{contributorsCount}</Cell>
        <Cell>
          <Button color="green" basic onClick={this.onApprove}>Approve</Button>
        </Cell>
       </Row>
     );
  }
}

export default RequestRow;