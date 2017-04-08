import React from 'react';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';

class App extends React.Component {

  state = {
    userID: 'Daryll Curry',
    history: [],
  };

  componentDidMount() {

    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-7189b848-b606-4eb2-ad8a-16b8476201de',
      subscribe_key: 'sub-c-179bfc80-1b21-11e7-b284-02ee2ddab7fe',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });

    this.PubNub.subscribe({
        channel: 'ReactChat',
        message: (message) => this.setState({ 
          history: this.state.history.concat(message) 
        }),
    });

  }

  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'ReactChat',
      message: message,
    });
  }

  render() {
    const { sendMessage, state } = this;
    return (
      <div>
        <h3>Chat between Daryll & Veer</h3>
        <ChatHistory history={ state.history } />
        <ChatInput userID={ state.userID } sendMessage={ sendMessage } />
      </div>
    );
  }
}

export default App;
