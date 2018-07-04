import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Form,Button, Message, Input} from 'semantic-ui-react';
import {Link, Router} from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class RequestNew extends Component{
  state = {
    amount:'',
    recipient:'',
    description:'',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps(props){
    const {address} = props.query;
    return {address};
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading:true, errorMessage:''});
    const campaign = Campaign(this.props.address);
    const {description, amount, recipient} = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(description, web3.utils.toWei(amount, 'ether'), recipient).send({
        from: accounts[0]
      });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({errorMessage:err.message});
    }

    this.setState({loading:false, amount:''});

  }

  render(){
    return (
      <Layout>
      <h3>Create a Request</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={this.state.description}
            onChange={event => this.setState({description: event.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Amount</label>
          <Input
            label="Ether"
            labelPosition="right"
            value={this.state.amount}
            onChange={event => this.setState({amount: event.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={this.state.recipient}
            onChange={event => this.setState({recipient: event.target.value})}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>Create!</Button>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;
