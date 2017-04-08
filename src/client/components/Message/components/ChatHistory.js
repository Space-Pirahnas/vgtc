import * as React from 'react';

export default class ChatHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
  };

  render() {
    const { props } = this; // same as `const props = this.props;`
    return (
    <ul className="collection">
      { props.history.map((messageObj) => {
        const imgURL = 'http://cdn-s3.si.com/s3fs-public/teams/basketball/nba/players/338365-328x278.png';
        const messageDate = new Date(messageObj.When);
        const messageDateTime = messageDate.toLocaleDateString() + ' at ' + messageDate.toLocaleTimeString();
        return (
        <li className="collection-item avatar" key={ messageObj.When } >
          <img src={ imgURL } alt={ messageObj.Who } className="circle" />
          <span className="title">{ messageObj.Who }</span>
          <p>
            <i className="prefix mdi-action-alarm" />
            <span className="message-date"> {messageDateTime} </span>
            <br />
            <span>{ messageObj.What }</span>
          </p>
        </li>
        ); })
      }
    </ul>);
  }
}
