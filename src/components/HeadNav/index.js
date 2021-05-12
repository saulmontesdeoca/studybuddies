import React from 'react';
import { Text, View , StyleSheet, Image, ImageBackground} from 'react-native';

const HeadNav = () => {
    return (
        <View style={styles.container}>
            <View
                style={[styles.box]}
            >
                <Image
                    style={styles.menuIcon}
                    source={require('../../../assets/icons/menu.png')}
                />
            </View>
            <View
                style={[styles.logoContianer]}
            >
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo-short.png')}
                />
            </View>
            <View
                style={[styles.box]}
            >
                <Image
                    style={styles.messagesIcon}
                    source={require('../../../assets/icons/messages.png')}
                />
            </View>
        </View>
    );
};

export default HeadNav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    box: {
        height: 50,
        flex:1
      },
    logo: {
        // flex: 1,
        width: '60%',
        height: '75%',
        marginHorizontal: 20,
        alignSelf: 'center',
        marginTop: 10
    },
    logoContianer: {
        height: 50,
        flex:4,
    },
    messagesIcon: {
        width: 34,
        height: 34,
        marginTop: 12
    },
    menuIcon: {
        width: 24,
        height: 24,
        marginTop: 15,
        marginLeft: 20
    }
});