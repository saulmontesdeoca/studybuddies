import React from 'react';
import { Text, View , StyleSheet, Button} from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}> 
            <Text>Welcome</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});