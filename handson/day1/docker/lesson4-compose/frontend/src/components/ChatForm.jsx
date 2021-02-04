import React from 'react';

import { Button, Header, Form } from 'semantic-ui-react';

const ChatForm = (props) => {
  const {
    loading, nick, summary, handleInputChange, setLoading, createChat,
  } = props;

  return (
    <div className="chatform">
      <Header as="h3" dividing>Write to chat</Header>

      <Form loading={loading}>
        <Form.Field>
          <label>Your nick:</label>
          <input name="nick" value={nick} onChange={event => handleInputChange(event.target)} />
        </Form.Field>

        <Form.TextArea name="summary" value={summary} onChange={event => handleInputChange(event.target)} label="Message" placeholder="Write your message" rows="6" />
        <Button primary onClick={createChat}>Send message</Button>
      </Form>
    </div>
  );
};

export default ChatForm;
