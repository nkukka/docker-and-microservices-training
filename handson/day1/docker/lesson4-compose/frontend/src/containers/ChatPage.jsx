import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import io from 'socket.io-client';

import { Header } from 'semantic-ui-react';

import Api from '../api/Api';

import ChatHistory from '../components/ChatHistory';
import ChatForm from '../components/ChatForm';

const ENDPOINT = process.env.ENDPOINT || 'http://0.0.0.0:9000';

class ChatPage extends Component {
  state = {
    loading: false,
    history: [],
    nick: '',
    summary: '',
  };

  async componentWillMount() {
    this.setupSocket();

    const nick = localStorage.getItem('nick');

    if (nick) {
      this.setState({ nick });
    }
  }

  getChats = async () => {
    const { socket } = this.state;

    socket.emit('get chats');
  }

  setLoading = loading => this.setState({ loading });

  setupSocket = () => {
    const socket = io(ENDPOINT);
    const that = this;

    socket.on('chats', (data) => {
      that.setState({ history: data.results });
    });

    socket.on('chat created', () => {
      that.setState({ summary: '', loading: false });
    });

    socket.emit('get chats', {}, (data) => {
      that.setState({ history: data.results });
    });

    this.setState({ socket });
  }

  createChat = async () => {
    const { socket, nick, summary } = this.state;

    this.setState({ loading: true });

    if (nick) {
      localStorage.setItem('nick', nick);
    }


    socket.emit('create chat', { nick, summary });
  }

  handleInputChange = (params) => {
    const { name, value } = params;

    this.setState({ [name]: value });
  }

  render() {
    const { loading, history, nick, summary } = this.state;

    return (
      <div className="ui grid">
        <div className="column">
          <Header as="h1" textAlign="center">socket.io chat example</Header>

          <ChatHistory history={history} handlers={{ getChats: this.getChats }} />

          <ChatForm loading={loading} nick={nick} summary={summary} handleInputChange={this.handleInputChange} setLoading={this.setLoading} createChat={this.createChat} />
        </div>
      </div>
    );
  }
}

export default withRouter(ChatPage);
