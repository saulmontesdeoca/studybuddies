import React from 'react';
import { Text, View , StyleSheet, Button} from 'react-native';

const Feed = ({ navigation }) => {
    return (
        <View style={styles.container}> 
            <Text>Feed</Text>
            <Button title="Go to Signin" onPress={() => navigation.navigate('Signin')} />
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Go to ChatRooms" onPress={() => navigation.navigate('ChatRooms')} />
        </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  