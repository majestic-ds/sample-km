import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
} from 'stream-chat-react-native';
import client, {connectUser, disconnectUser} from '../utils/chat';
import {useAuth} from '../context/AuthContext';

const ChatScreen = () => {
  const [channel, setChannel] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const setupChat = async (chatId: string) => {
      try {
        // Replace with your user details
        const user = {
          id: chatId,
          name: 'User Name',
        };

        await connectUser(user);

        const channel = client.channel('messaging', 'general', {
          name: 'General',
        });

        await channel.watch();

        setChannel(channel as any); // Update the type of the channel state variable
      } catch (error) {
        console.log(error);
      }
    };

    if (auth.authState?.user?.username) {
      setupChat(auth.authState.user?.username!);
    }

    return () => {
      disconnectUser();
    };
  }, [auth.authState?.user?.username]);

  if (!channel) {
    return null; // You can add a loading indicator here
  }

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Channel channel={channel}>
          <View style={styles.container}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </OverlayProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
