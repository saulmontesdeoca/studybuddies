import React from 'react';
import { Text, View , StyleSheet, Button} from 'react-native';

const Signin = ({navigation}) => {
    return (
        <View style={styles.container}> 
            <Text>Signin</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  