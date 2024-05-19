import {StreamChat} from 'stream-chat';

const client = StreamChat.getInstance('4k5geepwf4qk');

export const connectUser = async user => {
  await client.connectUser(user, client.devToken(user.id));
};

export const disconnectUser = async () => {
  await client.disconnectUser();
};

export default client;
