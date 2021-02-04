import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { Button, Header, Comment } from 'semantic-ui-react';

class ChatHistory extends Component {
  async componentWillMount() {
    const { handlers: { getChats } } = this.props;

    getChats();
  }

  chatItem = (chat) => {
    return (
      <Comment key={chat.id}>
        <Comment.Content>
          <Comment.Author as='a'>{chat.nick}</Comment.Author>
          <Comment.Metadata>
            <div>{ moment(chat.createdAt).fromNow() }</div>
          </Comment.Metadata>
          <Comment.Text>{chat.summary}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }

  render() {
    const { history } = this.props;

    if (history && history.length > 0) {
      return (
        <Comment.Group className="history">
          <Header as="h3" dividing>Chat history</Header>

          { history.map(chat => this.chatItem(chat)) }
        </Comment.Group>
      );
    }

    return null;
  }
}

export default ChatHistory;
