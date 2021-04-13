import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);
export default Button;

const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: '#009688',
      borderRadius: 100,
      borderColor: '#6A6A6A',
      paddingVertical: 12,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      alignSelf: "center",
    }
  });