import React from 'react';
import { Text, View , StyleSheet, Button} from 'react-native';

const ChatRooms = ({ navigation }) => {
    return (
        <View style={styles.container}> 
            <Text>ChatRooms</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ChatRooms;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  