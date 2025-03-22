import React from 'react';
import { useGetMessagesQuery, useGetStatusQuery, useSendMessageMutation } from '../../reduxToolkit/chat/slice.ts';

const ChatRTK = () => {
  const { data: messages, isLoading: isMessagesLoading } = useGetMessagesQuery();
  const { data: status, isLoading: isStatusLoading } = useGetStatusQuery();
  const [sendMessage] = useSendMessageMutation();

  console.log(messages);
  

  const handleSendMessage = () => {
    sendMessage('Hello, world!')
  };

  if (isMessagesLoading || isStatusLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Status: {status}</div>
      <ul>
        {messages?.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ChatRTK;