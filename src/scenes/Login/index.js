import React from 'react';
import { Text, View , StyleSheet, Button} from 'react-native';

const Login = ({ navigation }) => {
    return (
        <View style={styles.container}> 
            <Text>Login</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  